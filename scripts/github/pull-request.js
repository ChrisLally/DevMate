#!/usr/bin/env node

const { execSync } = require('child_process')

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}

function getLastCommitMessage() {
  return execSync('git log -1 --pretty=%B').toString().trim()
}

function createPullRequest() {
  try {
    const currentBranch = getCurrentBranch()
    if (currentBranch === 'main') {
      console.error('❌ Already on main branch')
      process.exit(1)
    }

    // Get the last commit message to use as PR title
    const lastCommitMessage = getLastCommitMessage()
    const prTitle = lastCommitMessage.split('\n')[0] // Use first line of commit message

    // Create PR using GitHub CLI
    console.log('Creating pull request...')
    execSync(
      `gh pr create \
        --base main \
        --head ${currentBranch} \
        --title "${prTitle}" \
        --body "## Changes\n${lastCommitMessage}\n\nCreated via DevMate PR automation"`,
      { stdio: 'inherit' }
    )
    
    console.log('\n✅ Pull request created successfully!')
    
    // Open PR in browser
    const { shouldOpen } = await prompt({
      type: 'confirm',
      name: 'shouldOpen',
      message: 'Would you like to open the PR in your browser?',
      initial: true
    })
    
    if (shouldOpen) {
      execSync('gh pr view --web', { stdio: 'inherit' })
    }
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Create PR from current branch to main
createPullRequest()
