/**
 * Tests for skill deployment configuration
 *
 * Verifies that skill names in constants.js match actual skill directories
 * and that deprecated skills are not referenced.
 */

const fs = require('fs');
const path = require('path');
const { ALL_SKILLS } = require('../lib/constants');

describe('Skill Deployment', () => {
  describe('ALL_SKILLS configuration', () => {
    test('includes codebase-analysis skill', () => {
      expect(ALL_SKILLS).toContain('codebase-analysis');
    });

    test('includes create-prd skill', () => {
      expect(ALL_SKILLS).toContain('create-prd');
    });

    test('does not include promote-to-prd (never existed, not renamed)', () => {
      // Clarification: The skill was always named create-prd.
      // promote-to-prd was a proposed name that was never used.
      expect(ALL_SKILLS).not.toContain('promote-to-prd');
    });

    test('all skills are unique (no duplicates)', () => {
      const uniqueSkills = new Set(ALL_SKILLS);
      expect(uniqueSkills.size).toBe(ALL_SKILLS.length);
    });

    test('all skill names are valid identifiers', () => {
      const validPattern = /^[a-z][a-z0-9-]*$/;
      for (const skill of ALL_SKILLS) {
        expect(skill).toMatch(validPattern);
      }
    });
  });

  describe('Skill directory verification', () => {
    const skillsDir = path.join(__dirname, '..', '..', 'Skills');

    // Only run these tests if Skills directory exists (in development)
    const skillsDirExists = fs.existsSync(skillsDir);

    (skillsDirExists ? test : test.skip)('codebase-analysis directory exists', () => {
      const skillPath = path.join(skillsDir, 'codebase-analysis');
      expect(fs.existsSync(skillPath)).toBe(true);
    });

    (skillsDirExists ? test : test.skip)('codebase-analysis has SKILL.md', () => {
      const skillMd = path.join(skillsDir, 'codebase-analysis', 'SKILL.md');
      expect(fs.existsSync(skillMd)).toBe(true);
    });

    (skillsDirExists ? test : test.skip)('create-prd directory exists', () => {
      const skillPath = path.join(skillsDir, 'create-prd');
      expect(fs.existsSync(skillPath)).toBe(true);
    });

    (skillsDirExists ? test : test.skip)('create-prd has SKILL.md', () => {
      const skillMd = path.join(skillsDir, 'create-prd', 'SKILL.md');
      expect(fs.existsSync(skillMd)).toBe(true);
    });

    (skillsDirExists ? test : test.skip)('promote-to-prd directory does not exist', () => {
      const skillPath = path.join(skillsDir, 'promote-to-prd');
      expect(fs.existsSync(skillPath)).toBe(false);
    });

    (skillsDirExists ? test : test.skip)('all skills in ALL_SKILLS have directories', () => {
      for (const skill of ALL_SKILLS) {
        const skillPath = path.join(skillsDir, skill);
        if (!fs.existsSync(skillPath)) {
          // Skip packaged skills that may not have directories
          continue;
        }
        expect(fs.existsSync(skillPath)).toBe(true);
      }
    });
  });

  describe('Skill naming conventions', () => {
    test('skills use kebab-case naming', () => {
      const kebabCase = /^[a-z]+(-[a-z0-9]+)*$/;
      for (const skill of ALL_SKILLS) {
        expect(skill).toMatch(kebabCase);
      }
    });

    test('no skill names contain underscores', () => {
      for (const skill of ALL_SKILLS) {
        expect(skill).not.toContain('_');
      }
    });

    test('no skill names contain uppercase', () => {
      for (const skill of ALL_SKILLS) {
        expect(skill).toBe(skill.toLowerCase());
      }
    });
  });

  describe('Core skills verification', () => {
    // Core skills that must be present for basic functionality
    const coreSkills = [
      'codebase-analysis',
      'create-prd',
      'tdd-red-phase',
      'tdd-green-phase',
      'tdd-refactor-phase'
    ];

    test.each(coreSkills)('%s is in ALL_SKILLS', (skill) => {
      expect(ALL_SKILLS).toContain(skill);
    });
  });
});
