import requests, os, json

PROJECT_ID = "4rllejq1"
DATASET = "production"
TOKEN = os.environ["SANITY_API_TOKEN"]
QUERY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2026-03-16/data/query/{DATASET}"
MUTATE_URL = f"https://{PROJECT_ID}.api.sanity.io/v2026-03-16/data/mutate/{DATASET}"
HEADERS = {"Authorization":f"Bearer {TOKEN}","Content-Type":"application/json"}

resp = requests.get(QUERY_URL, params={"query":'*[_type == "article"]._id'}, headers=HEADERS, timeout=30)
ids = resp.json().get("result",[])
print(f"Found {len(ids)} articles in Sanity")

if ids:
    for i in range(0, len(ids), 100):
        batch = ids[i:i+100]
        requests.post(MUTATE_URL, headers=HEADERS, json={"mutations":[{"delete":{"id":bid}} for bid in batch]})
    print(f"Wiped {len(ids)} articles from Sanity")
else:
    print("Sanity already clean — nothing to wipe")

LOG_FILE = "/workspaces/AccountingBody-Platfrom/scripts/migration_log.json"
with open(LOG_FILE, "w") as f:
    json.dump({"done":[],"failed":[],"skipped":[]}, f, indent=2)
print("Migration log cleared")
print("Ready for a fresh migration run")