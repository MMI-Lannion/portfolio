CREATE OR REPLACE FUNCTION get_distinct_sae_for_user(p_user_id int8)
RETURNS TABLE (
    description TEXT,
    name TEXT,
    completed BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (sd.id_sae)
        sd.sae AS description, 
        sd.id_sae AS name, 
        COALESCE(usd.completed, false) AS completed
    FROM "User_Data" AS ud
    JOIN "Sae_Data" AS sd 
        ON sd.but = ud.but
    LEFT JOIN "User_Sae_Data" AS usd 
        ON sd.id_sae = usd.id_sae AND usd.user_id = ud.id
    WHERE ud.id = p_user_id
    ORDER BY sd.id_sae, sd.id;
END;
$$ LANGUAGE plpgsql;


SELECT DISTINCT ON (sd.id_sae, sd.bloc_competences)
    sd.bloc_competences
FROM "Sae_Data" AS sd
WHERE sd.id_sae = 'Saé 101';


CREATE OR REPLACE FUNCTION get_user_competences (p_user_id INTEGER, p_id_sae TEXT) 
RETURNS JSONB AS $$
DECLARE
    user_competences JSONB;
    calculated_competences JSONB;
    total_count INTEGER;
BEGIN
    -- Try to get user competences from User_Sae_Data
    SELECT competences 
    INTO user_competences
    FROM "User_Sae_Data"
    WHERE user_id = p_user_id AND id_sae = p_id_sae;

    -- If user competences exist and are not null, return them
    IF user_competences IS NOT NULL THEN
        RETURN user_competences;
    END IF;

    -- Calculate competences based on Sae_Data
    WITH distinct_competences AS (
        SELECT DISTINCT bloc_competences
        FROM "Sae_Data"
        WHERE id_sae = p_id_sae
    ),
    competences_count AS (
        SELECT COUNT(*) AS total_count 
        FROM distinct_competences
    )
    -- Aggregate the calculated competences into JSON format
    SELECT 
        jsonb_agg(
            jsonb_build_object(
                'key', dc.bloc_competences,
                'percentage', (100.0 / c.total_count)::numeric,
                'keywords', '[]'::jsonb
            )
        ) INTO calculated_competences
    FROM distinct_competences dc
    CROSS JOIN competences_count c;

    -- Return the calculated competences
    RETURN calculated_competences;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION get_user_hardskills(p_user_id INTEGER, p_id_sae TEXT) 
RETURNS JSONB AS $$
DECLARE
    user_hardskills JSONB;
    calculated_hardskills JSONB;
BEGIN
    -- Try to get user hardskills from User_Sae_Data
    SELECT hardskills 
    INTO user_hardskills
    FROM "User_Sae_Data"
    WHERE user_id = p_user_id AND id_sae = p_id_sae;

    -- If user hardskills exist and are not null, return them
    IF user_hardskills IS NOT NULL THEN
        RETURN user_hardskills;
    END IF;

    -- Calculate hardskills based on Sae_Data
    SELECT jsonb_agg(
           jsonb_build_object(
               'name', competence_cle,
               'hardskills', hardskills
           )
       )
       INTO calculated_hardskills
FROM (
    WITH distinct_competences AS (
        SELECT DISTINCT competence_cle, sous_competence
        FROM "Sae_Data"
        WHERE id_sae = p_id_sae
    )
    SELECT 
        competence_cle,
        jsonb_object_agg(sous_competence, 0::numeric) AS hardskills
    FROM distinct_competences
    GROUP BY competence_cle
) dc;

    -- Return the calculated hardskills JSON
    RETURN calculated_hardskills;
END;
$$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_user_tools(p_user_id INTEGER, p_id_sae TEXT) 
RETURNS JSONB AS $$
DECLARE
    user_tools JSONB;
    calculated_tools JSONB;
BEGIN
    -- Try to get user tools from User_Sae_Data
    SELECT outils
    INTO user_tools
    FROM "User_Sae_Data"
    WHERE user_id = p_user_id AND id_sae = p_id_sae;

    -- If user tools exist and are not null, return them
    IF user_tools IS NOT NULL THEN
        RETURN user_tools;
    END IF;

    -- Calculate tools based on Sae_Data
    SELECT jsonb_object_agg(outil, 0::numeric) INTO calculated_tools
FROM (
    SELECT DISTINCT outils AS outil
    FROM "Sae_Tools_Data"
    WHERE id_sae = p_id_sae
) distinct_outils;


    -- Return the calculated tools JSON
    RETURN calculated_tools;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_sae_data(p_user_id INTEGER, p_id_sae TEXT)
RETURNS JSONB AS $$
DECLARE
    user_competences JSONB;
    user_hardskills JSONB;
    user_outils JSONB;
    user_fichiers JSONB;
    user_contexte TEXT;
    user_demarche TEXT;
    user_livrable TEXT;
    user_actions TEXT;
    user_axe_amelioration TEXT;
    user_competence_cle TEXT;
    user_sous_competences JSONB;
    calculated_competences JSONB;
    calculated_hardskills JSONB;
    calculated_tools JSONB;
    total_count INTEGER;
BEGIN
    -- Try to get user competences, hardskills, tools, fichiers, contexte, demarche, livrable from User_Sae_Data
    SELECT competences, hardskills, outils, fichiers, contexte, demarche, livrable, actions, axe_amelioration, sous_competences, competence_cle
    INTO user_competences, user_hardskills, user_outils, user_fichiers, user_contexte, user_demarche, user_livrable, user_actions, user_axe_amelioration, user_sous_competences, user_competence_cle
    FROM "User_Sae_Data"
    WHERE user_id = p_user_id AND id_sae = p_id_sae;

    -- If user competences do not exist, calculate them
    IF user_competences IS NULL THEN
        -- Calculate competences based on Sae_Data
        WITH distinct_competences AS (
            SELECT DISTINCT bloc_competences
            FROM "Sae_Data"
            WHERE id_sae = p_id_sae
        ),
        competences_count AS (
            SELECT COUNT(*) AS total_count 
            FROM distinct_competences
        )
        SELECT 
            jsonb_agg(
                jsonb_build_object(
                    'key', dc.bloc_competences,
                    'percentage', (100.0 / c.total_count)::numeric,
                    'keywords', '[]'::jsonb
                )
            ) INTO calculated_competences
        FROM distinct_competences dc
        CROSS JOIN competences_count c;
    ELSE
        -- If user competences exist, use them
        calculated_competences := user_competences;
    END IF;

    -- If user hardskills do not exist, calculate them
    IF user_hardskills IS NULL THEN
        -- Calculate hardskills based on Sae_Data
        SELECT jsonb_agg(
               jsonb_build_object(
                   'name', competence_cle,
                   'data', hardskills
               )
           ) INTO calculated_hardskills
        FROM (
            WITH distinct_competences AS (
                SELECT DISTINCT competence_cle, sous_competence
                FROM "Sae_Data"
                WHERE id_sae = p_id_sae AND ac_integrer_dans_sae = 'OUI'
            )
            SELECT 
                competence_cle,
                jsonb_object_agg(sous_competence, 0::numeric) AS hardskills
            FROM distinct_competences
            GROUP BY competence_cle
        ) dc;
    ELSE
        -- If user hardskills exist, use them
        calculated_hardskills := user_hardskills;
    END IF;

    -- If user tools do not exist, calculate them
    IF user_outils IS NULL THEN
        -- Calculate tools based on Sae_Tools_Data
        SELECT jsonb_object_agg(outil, 0::numeric) INTO calculated_tools
        FROM (
            SELECT DISTINCT outils AS outil
            FROM "Sae_Tools_Data"
            WHERE id_sae = p_id_sae
        ) distinct_outils;
    ELSE
        -- If user tools exist, use them
        calculated_tools := user_outils;
    END IF;

    -- Return all calculated and user data as JSON
    RETURN jsonb_build_object(
        'competences', calculated_competences,
        'hardskills', calculated_hardskills,
        'outils', calculated_tools,
        'fichiers', COALESCE(user_fichiers, '{}'::jsonb),
        'contexte', COALESCE(user_contexte, ''),
        'demarche', COALESCE(user_demarche, ''),
        'livrable', COALESCE(user_livrable, ''),
        'actions', COALESCE(user_actions, ''),
        'axeAmelioration', COALESCE(user_axe_amelioration, ''),
        'competenceCle', COALESCE(user_competence_cle, ''),
        'sousCompetences', COALESCE(user_sous_competences, '[]'::jsonb)
    );
END;
$$ LANGUAGE plpgsql;

SELECT get_user_competences(1, 'Saé 101');

SELECT get_user_hardskills(1, 'Saé 101');

SELECT get_user_tools(1, 'Saé 101');


SELECT get_user_sae_data(1, 'Saé 101');