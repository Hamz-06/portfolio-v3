import Cloudflare from 'cloudflare';
import { config } from 'dotenv';
config({ path: '.env.local', override: false });


type ItemsToDelete = {
  namespace_id: string;
  keys: string[];
}[]

(async () => {
  try {
    const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;
    const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;

    if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
      console.warn('⚠️ Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID — skipping KV cache clear.');
      return;
    }

    console.log('removing kv cache...');
    const itemsToDelete: ItemsToDelete = []
    const client = new Cloudflare({
      apiToken: CLOUDFLARE_API_TOKEN,
    });

    for await (const namespace of client.kv.namespaces.list({ account_id: CLOUDFLARE_ACCOUNT_ID })) {
      const keyNames: string[] = [];
      const namespaceId = namespace.id;

      for await (const key of client.kv.namespaces.keys.list(namespaceId, {
        account_id: CLOUDFLARE_ACCOUNT_ID,
      })) {
        keyNames.push(key.name);
      }
      itemsToDelete.push({
        namespace_id: namespaceId,
        keys: keyNames,
      })
    }

    for (const item of itemsToDelete) {
      const res = await client.kv.namespaces.bulkDelete(item.namespace_id, {
        account_id: CLOUDFLARE_ACCOUNT_ID,
        body: item.keys
      });

      console.log(`Deleted ${item.keys.length} keys from namespace ${item.namespace_id}:`, res);
    }
    console.log('Successfully deleted keys from all namespaces');

  } catch (error) {
    console.warn('⚠️ KV cache clear failed silently:', error instanceof Error ? error.message : error);
  }
})();