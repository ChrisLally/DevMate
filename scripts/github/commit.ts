#!/usr/bin/env ts-node

import { execSync } from 'child_process'

const COMMIT_TYPES = [
  'feat',     // A new feature
  'fix',      // A bug fix
  'docs',     // Documentation only changes
  'style',    // Changes that do not affect the meaning of the code
  'refactor', // A code change that neither fixes a bug nor adds a feature
  'perf',     // A code change that improves performance
  'test',     // Adding missing tests or correcting existing tests
  'chore',    // Changes to the build process or auxiliary tools
  'revert',   // Reverts a previous commit
] as const

interface CommitDetails {
  type: typeof COMMIT_TYPES[number]
  scope?: string
  message: string
  body?: string
}

function validateCommitType(type: string): type is typeof COMMIT_TYPES[number] {
  return COMMIT_TYPES.includes(type as typeof COMMIT_TYPES[number])
}

function formatCommitMessage({ type, scope, message, body }: CommitDetails): string {
  if (!validateCommitType(type)) {
    throw new Error(`Invalid commit type: ${type}. Must be one of: ${COMMIT_TYPES.join(', ')}`)
  }
  
  const scopeStr = scope ? `(${scope})` : ''
  const header = `${type}${scopeStr}: ${message}`
  return body ? `${header}\n\n${body}` : header
}

function createCommit(details: CommitDetails): void {
  try {
    // Check if there are staged changes
    const status = execSync('git status --porcelain').toString()
    if (!status) {
      console.log('No changes to commit!')
      process.exit(0)
    }

    const commitMessage = formatCommitMessage(details)
    
    // Create the commit and push using GitHub CLI
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })
    console.log('\n✅ Commit created successfully!')
    
    execSync('git push', { stdio: 'inherit' })
    console.log('\n✅ Changes pushed successfully!')
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Example usage:
createCommit({
  type: 'feat',
  scope: 'github',
  message: 'Add GitHub CLI commit automation script',
  body: 'Created a TypeScript script to help automate commits using GitHub CLI'
})
