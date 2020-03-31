#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in wangdoc-deploy-rsa.enc -out wangdoc-deploy-rsa -d
chmod 600 wangdoc-deploy-rsa
eval `ssh-agent -s`
ssh-add wangdoc-deploy-rsa

# Now that we're all set up, we can push.
# git push $SSH_REPO $TARGET_BRANCH
npm run build-and-commit
