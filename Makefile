SHELL := /bin/bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

help:
	@printf "Usage: make [target] [VARIABLE=value]\nTargets:\n"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

hooks: ## Setup pre commit.
	@pre-commit install
	@pre-commit gc

validate: ## Validate files with pre-commit hooks
	@pre-commit run --all-files

cleanup: ## Cleanup folders
	@find . -type d -name "node_modules" -prune -exec rm -rf {} \;
# 	@find . -type f -name "*.lock" -prune -exec rm  {} \;

DIRECTORY := with-tests/eks-addons

run: ## Run it
	@scripts/run.sh $(DIRECTORY)

install: ## Install dependencies
	@scripts/install.sh $(DIRECTORY)
