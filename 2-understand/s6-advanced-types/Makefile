help:
	@printf "Usage: make [target] [VARIABLE=value]\nTargets:\n"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run-intersections: ## Run intersections
	@deno run intersection.ts

run-type-guards: ## Run type guards
	@deno run type-guards.ts

run-disc-unions: ## Run discriminated unions
	@deno run disc-union.ts

run-type-casting: ## Run type casting
	@deno run type-casting.ts
