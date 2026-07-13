# Sailly Voice Agent — Project Directory

## Knowledge Pack (MANDATORY — read before ANY work, task-sandwich order)

Read in this exact order (DeepSeek V4 U-shaped attention — architecture first, constraints last):

**ZONE 1 — ARCHITECTURE (loaded first, highest retention):**
1. `/home/charles2/sailly-browser-demo/docs/ai/INDEX.md` — master index + file tree + dependency graph
2. `/home/charles2/sailly-browser-demo/docs/ai/fsm-phases.mmd` — visual FSM phase transition diagram
3. `/home/charles2/sailly-browser-demo/docs/ai/01-architecture.md` — FSM phases, tool categories, breakthrough rules

**ZONE 2 — CONTEXT (loaded middle, navigational):**
4. `/home/charles2/sailly-browser-demo/docs/ai/02-failure-catalog.md` — symptom-to-root-cause
5. `/home/charles2/sailly-browser-demo/docs/ai/03-lessons.md` — known pitfalls
6. `/home/charles2/sailly-browser-demo/docs/ai/04-research/index.md` — model specs, token budgets
7. `/home/charles2/sailly-browser-demo/docs/ai/05-flows/` — order, reservation, FAQ, multi-intent
8. `/home/charles2/sailly-browser-demo/docs/ai/06-reference/` — slots, tools, date parsing
9. `/home/charles2/sailly-browser-demo/docs/ai/repomix-output.xml` — full codebase context (92 files, 297K tokens)

**ZONE 3 — CONSTRAINTS (loaded LAST, enforced by recency bias):**
10. `/home/charles2/sailly-browser-demo/docs/ai/08-verification-pipeline.md` — MANDATORY 9-phase execution protocol
11. `/home/charles2/sailly-browser-demo/docs/ai/10-gate-checklist.md` — PRE-FIX GATE + COMPLETION GATE
12. `/home/charles2/sailly-browser-demo/docs/ai/12-behavioral-contracts.md` — PEP/PDP architecture, ABC contracts
13. `/home/charles2/sailly-browser-demo/docs/ai/09-knowledge-matrix.yaml` — QUERY BEFORE ANY FIX ATTEMPT
14. `/home/charles2/sailly-browser-demo/docs/ai/07-session/handoff.md` — current session state

**Total: ~15,000 lines (~270K tokens). Model has 1M context window.**
**After loading: ~730K tokens remain for code analysis.**

**EXECUTION DISCIPLINE (repeated at bottom — recency bias):**
- EVERY fix follows the 9-phase verification pipeline (`08-verification-pipeline.md`)
- Check `09-knowledge-matrix.yaml` BEFORE attempting any fix — has this been tried before?
- PRE-FIX GATE must be shown in-chat BEFORE writing any code
- COMPLETION GATE must be shown in-chat BEFORE claiming success
- ONE fix per iteration. Deploy + verify BEFORE next fix.
- LLM for language, code for state. FSM owns ALL transitions.
- ZERO keyword/regex intent routing. `extract_multi` is sole authority.
- Category B tools are FSM-only. LLM never fires `create_order`/`send_sms`/`end_call`.
- RESEARCH ONLINE before proposing solutions that require external knowledge. Never guess.
- Query subagent findings fully — never cherry-pick. Apply all applicable research.

SSH workspace for Sailly brain development. The authoritative rules are in `.cursor/rules/` — start there, not here.

## Cloud Agents (Automations)

When running as a Cursor cloud agent (automations / scheduled jobs):

- **Do NOT use `systemctl`** -- systemd only applies on the production VM. Cloud agents run in an isolated sandbox without access to the VM.
- **Run servers directly** with `SKIP_VERTEX_PREFLIGHT=1`:
  - Backend: `SKIP_VERTEX_PREFLIGHT=1 python3 -m uvicorn server.main:app --host 0.0.0.0 --port 8080`
  - Dashboard: `cd apps/dashboard && npm run dev -- -p 3000`
- **Testing**: Cloud agents have no WebSocket access. Validate via the HTTP health endpoint (`/health`) and Supabase query results, not live WebSocket calls.
- **Pre-existing test caveats**:
  - `test_conversation_fsm.py` requires the project venv + dependencies (not guaranteed in cloud sandbox)
  - `turn2_fix_loop.py --run` requires a live WebSocket server (unavailable in cloud)
  - Cloud agents should validate via code analysis, linting, and Supabase MCP queries instead

## Workspaces

| Path | Purpose |
|------|---------|
| `/home/charles2/sailly-browser-demo/` | Runtime repo (GitHub, production) |
| `/home/charles2/.ssh/` | Dev repo (rules, skills, plans, configs) |

## Architecture (5 principles)

1. **LLM for language, code for state** — FSM drives flow, LLM handles language only
2. **Zero tenant hardcodes in brain** — all logic from `TenantConfig` YAML
3. **Category B tools are code-driven** — `create_order`, `send_sms`, `end_call`, etc.
4. **Production path:** `v4_pipeline_clean.py` → `ConversationFSM(ctx=ctx)`
5. **Redis schema v7** — new `ConversationState` fields need `to_dict()` + `from_dict()`

## How to Start

1. Read `.cursor/rules/00-core.mdc` — the master pointer
2. Read `.cursor/rules/01-discipline.mdc` — what never to do
3. Read `.cursor/rules/02-deploy.mdc` — how to deploy safely
4. When editing `server/brain/`: `.cursor/rules/restaurant-voice-agent.mdc` loads automatically

## Key Runtime Paths

| File | What |
|------|------|
| `server/brain/conversation_fsm.py` | FSM phases + transitions |
| `server/brain/conversation_state.py` | State + Redis persistence |
| `server/brain/v4_pipeline_clean.py` | Production pipeline entry point |
| `server/brain/slot_extractor.py` | `extract_multi` intent + slot extraction |
| `configs/tenants/{id}.yaml` | Tenant definitions |
| `server/tests/test_conversation_fsm.py` | Golden tests (65/65, dual tenant) |
| `agent-vault/handoff.md` | Latest pass rates + session state |
| `agent-vault/lessons.md` | Pitfalls and known bug classes |

## Testing & Validation

```bash
# Unit tests (must be 65/65)
python3 -m pytest server/tests/test_conversation_fsm.py

# Smoke (6/6 before claiming brain fix done)
python3 server/validation/turn2_fix_loop.py --smoke

# Full validation (62 scenarios, live WebSocket)
python3 server/validation/turn2_fix_loop.py --run
```

## Server (systemd)

```bash
sudo systemctl restart sailly-browser-demo
sudo journalctl -u sailly-browser-demo -f
```

## Rules System

| File | Loads | Covers |
|------|-------|--------|
| `00-core.mdc` | Always | Master pointer |
| `01-discipline.mdc` | Always | Hard stops, forbidden patterns |
| `02-deploy.mdc` | Always | Deploy gate, server restart, infra safety |
| `permissions.mdc` | Always | Permission fix protocol |
| `restaurant-voice-agent.mdc` | `server/brain/**` | Breakthrough rules, domain rules |
| `voice-flows.mdc` | `server/brain/**` | FSM flow rules (order/reservation/multi-intent) |
| `architecture-gate.mdc` | `server/brain/**` | Pre-edit blocker checklist |
| `regression-pipeline.mdc` | `server/brain/**` | Post-fix regression checks |
| `premortem-check.mdc` | `server/brain/**` | Pre-claim checklist |
| `latency-investigation.mdc` | `server/**/*.py` | Latency investigation protocol |
| `replacement-rule.mdc` | Manual | Clean replacement during migrations |

## Skills

`date-time-parser` `historical-issue-regression` `live-call-analysis` `livecall-loop` `order-flow-validator` `state-machine-auditor` `tool-executor-checker`
