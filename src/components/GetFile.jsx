import {
  DownloadIcon,
} from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Heading,
  Link,
} from "@radix-ui/themes";
import { supabase } from '../lib/supabase.js';
import { useStore } from '@nanostores/react';
import { $saeData, $user } from '@/store/Store';

const GetFile = () => {

  // Get data from store
  const userId = useStore($saeData).userId;
  const saeId = useStore($saeData).saeId;
  const username = useStore($user).username;

  return (
    <Flex direction="column" gap="3">

      <Button onClick={async () => {

        const userFolder = `sae${saeId}_${username}_${userId}/`;
        const { data, error } = await supabase.storage.from('saeFiles').list(userFolder);

        const nameFile = data[0].name;
        console.log(nameFile);

        if (error) {
          console.error("Erreur:", error.message);
        } else {
          console.log("Fichiers:", data);
        }

        }}>
        Récupérer les fichiers
      </Button>

      <Flex>
            <Card
              style={{
                width: "250px",
              }}
            >
              <Flex width="100%" direction="row" justify="between" align="center" gap="2">
                  <Heading size="4">
                    {/* {nameFile}.pdf */}
                  </Heading>
                  <Link href="https://xsbdajqrhffnrhgcofje.supabase.co/storage/v1/object/authenticated/saeFiles/sae101_qdd_1/1729591714451_filevide.pdf">
                    <Button size="3" variant="solid">
                      <DownloadIcon />
                    </Button>
                  </Link>
                </Flex>
            </Card>
          </Flex>

    </Flex>
  );
};

export default GetFile;
