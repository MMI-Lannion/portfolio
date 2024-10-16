import { useEffect } from 'react';
import { supabase } from '../lib/supabase.js';

const CheckConnection = () => {

  useEffect(() => {
    const checkConnection = async () => {
      try {

        const { data, error } = await supabase.from('users').select('');
        

        if (error) {
          console.log('Connection failed: ' + error);
        } else {
          console.log('Connected');
          console.log(data);
        }
      } catch (error) {
        console.log('Error: ' + error);
      }
    };

    (async () => {
await checkConnection();
    }) ()
  }, []);

  return (
    <div>
    </div>
  );
};

export default CheckConnection;
