# TIEC proposed client workspace

Unofficial review concept. All records and reports are synthetic. No authentication, real client integration, certification or TIEC inquiry delivery is provided. Use fictional data only. The portal models TIEC-related consulting, auditing, inspection, QMS document and training workflows.

Run `node server.cjs` from this directory (`npm start` also works where npm is correctly installed). Default listener: `http://127.0.0.1:5180` (loopback only). Set `PORT` to a free alternative when required. The listener does not expose a network interface. Do not alter existing client-review servers or tunnels.

Local changes persist in `data/demo.json`, created on first run. Keep that runtime file out of source control. No paid services or dependencies are used. The progress controls and document approvals are explicitly demonstration states; the Academy link leads to the real external course site.

`node test.cjs` (or `npm test`) starts an isolated test instance with a temporary data directory, verifies create-request persistence, corrective-action history, document review, training progress and report download, and removes its temporary test data.

Grounding: official TIEC company, auditing, inspection and quality standards assistance pages; factual service language reviewed September 30, 2026. This portal is a proposed concept, not a verified existing TIEC offering.

POST changes require `application/json`; supplied Origin must match the request Host. Missing Origin remains allowed for CLI calls. Static files use an exact allowlist, so user-controlled paths cannot read runtime records or sibling folders. `node security-test.cjs` verifies these boundaries. This is still an unauthenticated shared demo; these checks do not provide client identity or access control. Training bookings use the Training service request and preferred date fields.
