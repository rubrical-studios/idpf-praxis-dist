# Anti-Hallucination Rules for Skill Creation
**Version:** v0.29.2
## Core Principle
**Accuracy over helpfulness. Precision over assumption. Verification over invention.**
When creating Skills from System Instructions or Frameworks, preserve original intent and structure rather than "improve" with invented additions.
---
## Information Source Hierarchy
1. **Source files being converted** (absolute authority) - System Instructions, Framework documents, existing Skills
2. **Established Skill patterns** (from examples) - SKILL.md format conventions, resource organization
3. **Claude Skill documentation** (official standards) - Skill creation guidelines
4. **Logical organization** (when not specified) - Maintain source structure, don't add content
---
## Absolute "Never Do" Rules
### NEVER Invent:
- Additional instructions not in source document
- Example code or scenarios not present in source
- Tool configurations or parameters not specified
- File structures or organization not defined
- Best practices or guidelines beyond source
- Templates or boilerplate not in source material
- Prerequisites or requirements not stated
- Workflow steps not explicitly described
- Error handling approaches not mentioned
- Additional resources or references not in source
### NEVER Assume:
- Vague instructions need clarification or expansion
- Examples need to be added for clarity
- Additional context would be helpful
- Source is incomplete without your additions
- Standardization requires adding new content
- Brevity needs elaboration
- Implicit knowledge should be made explicit
- Better organization means adding sections
---
## STOP Boundary Enforcement
When a command spec includes STOP boundary, this is a **hard stop**.
1. STOP means STOP - Execution must halt
2. No "helpful continuation" past boundaries
3. User instruction required to cross boundary
4. Re-verify after context loss
---
## Decision Trees
### When Converting System Instructions to Skills
**Step 1: Analyze source structure**
- Clearly organized → Map sections directly to Skill format
- Mixed formats → Preserve all content, organize minimally
- Unclear structure → Use minimal organization, preserve everything
**Step 2: Determine resource file needs**
- Examples in source → Extract to resource files
- Templates in source → Extract to resource files
- No extractable content → No resource files needed
**Step 3: Create SKILL.md structure**
- GOOD: Organize existing content under appropriate sections
- BAD: Add new sections or content not in source
### When Source Content is Ambiguous
**Don't clarify by adding.** Options:
1. Preserve ambiguity exactly as stated
2. Ask user if preserve as-is or clarify
3. Note in conversion: "Original instruction preserved, may need interpretation"
### When Source Content Seems Incomplete
**Don't complete it.** Options:
- Ask if there's additional material to incorporate
- Create Skill with only content provided, note what's minimal
---
## Domain-Specific Rules
### Framework to Skill Conversion
- Preserve framework structure (don't reorganize for "better flow")
- Convert decision trees exactly
- Keep all phases/stages as documented
- Keep framework terminology unchanged
### System Instructions to Skill Conversion
- Keep directive language ("MUST", "NEVER", "ALWAYS")
- Don't soften instructions with "typically" or "usually"
- Preserve instruction hierarchy and priority
- Keep all conditional logic
### Metadata and Skill Configuration
- Description must only reference actual content
- Don't promise capabilities not present in source
- Use specific, verifiable language from source
### Resource File Organization
```
resources/
  ├── examples/          # Only if examples exist in source
  ├── templates/         # Only if templates exist in source
  └── reference/         # Only if reference material in source
```
Create structure that matches source, not "standard" structure.
---
## Self-Checking Before Finalizing
**Content Fidelity:**
- [ ] Every instruction from source
- [ ] No explanatory content added
- [ ] Terminology matches exactly
- [ ] Examples extracted from source, not created
- [ ] Structure reflects source organization
**Resource Files:**
- [ ] Each file has corresponding source content
- [ ] No template files created from scratch
- [ ] Example code quoted from source
**Skill Metadata:**
- [ ] Description only mentions actual content
- [ ] No promises of functionality not in source
---
## Common Pitfalls
| Pitfall | Avoid |
|---------|-------|
| "Improving" source | "Check the file" stays as "Check the file" |
| Adding "helpful" context | "Use version control" stays as "Use version control" |
| Creating examples | Don't add "For example..." if not in source |
| Standardizing structure | Preserve unusual organization from source |
| Filling perceived gaps | No testing section if source doesn't mention testing |
---
## Conversion Workflow
**Phase 1: Analysis** - Read source, identify sections, note extractable content. Do NOT plan improvements.
**Phase 2: Mapping** - Map sections to Skill format. Do NOT add sections not in source.
**Phase 3: Extraction** - Copy content, preserve wording. Do NOT rephrase or elaborate.
**Phase 4: Verification** - Compare line-by-line. Do NOT make "final improvements".
---
## Final Reminder
**A perfect Skill conversion is invisible.** The Skill should read as if the original author wrote it in Skill format. Your role is translator, not editor or enhancer.
When tempted to improve:
1. **Stop** - resist the urge to add
2. **Verify** - check if it's in the source
3. **Preserve** - keep source content unchanged
4. **Document** - note what you're preserving
---
**End of Anti-Hallucination Rules for Skill Creation**
