Portfolio Website 2025 

In order for you to deploy this website,
1. You must first create the different KV namespaces in your Cloudflare dashboard. 
You can either use the dashboard or the Wrangler CLI to do this. You can run npm run kv create-kv -- KV_NAMESPACE_NAME
2. You must create the following kv namespaces, this is taken from the wrangler.jsonc file: 
   - PLAYLIST_KV_CACHE
   - PROFILE_KV_CACHE
   - PROJECT_KV_CACHE
3. Once you have created the KV namespaces, you will get the ID of the KV namespace. Update the wrangler.jsonc file with the ID of the KV namespace.

