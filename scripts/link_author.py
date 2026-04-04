import requests, os, json

PROJECT_ID = "4rllejq1"
DATASET = "production"
TOKEN = os.environ["SANITY_API_TOKEN"]
QUERY_URL = f"https://{PROJECT_ID}.api.sanity.io/v2026-03-16/data/query/{DATASET}"
MUTATE_URL = f"https://{PROJECT_ID}.api.sanity.io/v2026-03-16/data/mutate/{DATASET}"
HEADERS = {"Authorization":f"Bearer {TOKEN}","Content-Type":"application/json"}

# Step 1 — Ensure both authors exist
authors = [
    {
        "_id": "author-accountingbody-editorial-team",
        "_type": "author",
        "name": "AccountingBody Editorial Team",
        "slug": {"_type":"slug","current":"accountingbody-editorial-team"},
    },
    {
        "_id": "author-hrlake-editorial-team",
        "_type": "author",
        "name": "HRLake Editorial Team",
        "slug": {"_type":"slug","current":"hrlake-editorial-team"},
    },
]
for author in authors:
    resp = requests.post(MUTATE_URL, headers=HEADERS, json={"mutations":[{"createOrReplace":author}]}, timeout=30)
    print(f"Author upsert [{author['name']}]: {resp.status_code}")

# Step 2 — Link AccountingBody author to all wp-post articles
resp = requests.get(QUERY_URL, params={"query":'*[_id match "wp-post-*" && "accountingbody" in showOnSites && !("hrlake" in showOnSites)]._id'}, headers=HEADERS, timeout=60)
ab_ids = resp.json().get("result",[])
print(f"Found {len(ab_ids)} AccountingBody articles to link")

ab_ref = {"_type":"reference","_ref":"author-accountingbody-editorial-team"}
success = 0
for i in range(0, len(ab_ids), 100):
    batch = ab_ids[i:i+100]
    mutations = [{"patch":{"id":doc_id,"set":{"author":ab_ref}}} for doc_id in batch]
    resp = requests.post(MUTATE_URL, headers=HEADERS, json={"mutations":mutations}, timeout=30)
    if resp.status_code == 200:
        success += len(batch)
        print(f"Linked {success} AccountingBody articles...")
    else:
        print(f"Error: {resp.json()}")

# Step 3 — Link HRLake author to all HRLake articles
resp = requests.get(QUERY_URL, params={"query":'*[_type == "article" && "hrlake" in showOnSites]._id'}, headers=HEADERS, timeout=60)
hl_ids = resp.json().get("result",[])
print(f"Found {len(hl_ids)} HRLake articles to link")

hl_ref = {"_type":"reference","_ref":"author-hrlake-editorial-team"}
hl_success = 0
for i in range(0, len(hl_ids), 100):
    batch = hl_ids[i:i+100]
    mutations = [{"patch":{"id":doc_id,"set":{"author":hl_ref}}} for doc_id in batch]
    resp = requests.post(MUTATE_URL, headers=HEADERS, json={"mutations":mutations}, timeout=30)
    if resp.status_code == 200:
        hl_success += len(batch)
        print(f"Linked {hl_success} HRLake articles...")
    else:
        print(f"Error: {resp.json()}")

print(f"")
print(f"AUTHOR LINKING COMPLETE")
print(f"AccountingBody articles linked: {success}")
print(f"HRLake articles linked: {hl_success}")