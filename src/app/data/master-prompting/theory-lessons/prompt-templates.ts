import { TheoryLesson } from '../../learning-content';

export const promptTemplatesLesson: TheoryLesson = {
  id: 'prompt-templates',
  title: 'Building Reusable Prompt Templates: Engineering at Scale',
  description: 'Master the art of creating scalable, maintainable prompt systems through templates, libraries, and systematic management',
  estimatedTime: 40,
  difficulty: 'expert',
  xpReward: 200,
  content: {
    introduction: `
Prompt templates transform ad-hoc prompting into systematic engineering. By creating reusable, parameterized templates, we can build maintainable AI systems that scale across teams and applications while ensuring consistency, quality, and governance.

This approach treats prompts as software artifacts—version controlled, tested, documented, and optimized. Organizations using systematic prompt template libraries report 60% faster development, 40% fewer errors, and 80% better consistency across applications.
    `,

    sections: [
      {
        title: 'Template Architecture Patterns',
        content: `
**Core Template Components:**

\`\`\`python
class PromptTemplate:
    def __init__(self, template_str, metadata=None):
        self.template = template_str
        self.metadata = metadata or {}
        self.variables = self.extract_variables()
        self.validators = {}
        self.transformers = {}
        self.version = "1.0.0"

    def extract_variables(self):
        """Extract all {variable} placeholders"""
        import re
        pattern = r'\\{([^}]+)\\}'
        return re.findall(pattern, self.template)

    def add_validator(self, variable, validator_fn):
        """Add validation for a variable"""
        self.validators[variable] = validator_fn

    def add_transformer(self, variable, transformer_fn):
        """Add transformation for a variable"""
        self.transformers[variable] = transformer_fn

    def render(self, **kwargs):
        """Render template with validation and transformation"""
        # Validate inputs
        for var, validator in self.validators.items():
            if var in kwargs:
                if not validator(kwargs[var]):
                    raise ValueError(f"Validation failed for {var}")

        # Transform inputs
        for var, transformer in self.transformers.items():
            if var in kwargs:
                kwargs[var] = transformer(kwargs[var])

        # Check required variables
        missing = set(self.variables) - set(kwargs.keys())
        if missing:
            raise ValueError(f"Missing required variables: {missing}")

        # Render template
        return self.template.format(**kwargs)
\`\`\`

**Hierarchical Template System:**

\`\`\`python
class TemplateHierarchy:
    def __init__(self):
        self.base_templates = {}
        self.specialized_templates = {}

    def add_base_template(self, name, template):
        """Add a base template that others can extend"""
        self.base_templates[name] = template

    def create_specialization(self, base_name, special_name, modifications):
        """Create specialized version of base template"""
        base = self.base_templates[base_name]

        # Apply modifications
        specialized = PromptTemplate(base.template, base.metadata.copy())

        for mod_type, mod_value in modifications.items():
            if mod_type == 'prepend':
                specialized.template = mod_value + specialized.template
            elif mod_type == 'append':
                specialized.template = specialized.template + mod_value
            elif mod_type == 'replace':
                for old, new in mod_value.items():
                    specialized.template = specialized.template.replace(old, new)

        self.specialized_templates[special_name] = specialized
        return specialized

# Example usage
hierarchy = TemplateHierarchy()

# Base analysis template
base_analysis = PromptTemplate("""
Analyze the following {data_type}:
{data}

Provide:
1. Key findings
2. Patterns identified
3. Recommendations
""")

hierarchy.add_base_template('analysis', base_analysis)

# Specialized for financial data
financial_analysis = hierarchy.create_specialization(
    'analysis',
    'financial_analysis',
    {
        'prepend': "You are a financial analyst expert. ",
        'replace': {
            'Key findings': 'Financial metrics',
            'Patterns identified': 'Market trends',
            'Recommendations': 'Investment recommendations'
        }
    }
)
\`\`\`

**Composable Template System:**

\`\`\`python
class ComposableTemplate:
    def __init__(self):
        self.components = {}

    def add_component(self, name, content):
        """Add reusable component"""
        self.components[name] = content

    def compose(self, *component_names, separator="\\n\\n"):
        """Combine components into full template"""
        parts = []
        for name in component_names:
            if name not in self.components:
                raise ValueError(f"Component {name} not found")
            parts.append(self.components[name])

        return separator.join(parts)

# Build complex prompts from components
composer = ComposableTemplate()

composer.add_component('role', "You are a {role} with expertise in {domain}.")
composer.add_component('task', "Your task is to {action} the following {input_type}.")
composer.add_component('constraints', "Constraints:\\n- {constraint1}\\n- {constraint2}")
composer.add_component('format', "Output format:\\n{format_spec}")
composer.add_component('examples', "Examples:\\n{examples}")

# Compose different combinations
analysis_prompt = composer.compose('role', 'task', 'format')
detailed_prompt = composer.compose('role', 'task', 'constraints', 'examples', 'format')
\`\`\`
        `
      },
      {
        title: 'Template Management Systems',
        content: `
**Enterprise Template Library:**

\`\`\`python
class PromptLibrary:
    def __init__(self, storage_backend):
        self.storage = storage_backend
        self.templates = {}
        self.categories = {}
        self.access_control = AccessControl()
        self.usage_tracker = UsageTracker()

    def register_template(self, template_id, template, metadata):
        """Register new template with metadata"""
        # Validate template
        self.validate_template(template)

        # Store template
        self.templates[template_id] = {
            'template': template,
            'metadata': metadata,
            'created_at': datetime.now(),
            'version': metadata.get('version', '1.0.0'),
            'author': metadata.get('author'),
            'tags': metadata.get('tags', []),
            'category': metadata.get('category'),
            'tested': False,
            'approved': False
        }

        # Index by category
        category = metadata.get('category', 'uncategorized')
        if category not in self.categories:
            self.categories[category] = []
        self.categories[category].append(template_id)

        # Persist to storage
        self.storage.save(template_id, self.templates[template_id])

    def get_template(self, template_id, user=None):
        """Retrieve template with access control"""
        # Check access
        if not self.access_control.can_access(user, template_id):
            raise PermissionError(f"Access denied to template {template_id}")

        # Track usage
        self.usage_tracker.track(template_id, user)

        # Return template
        return self.templates.get(template_id)

    def search_templates(self, query=None, tags=None, category=None):
        """Search templates by various criteria"""
        results = []

        for tid, tdata in self.templates.items():
            # Category filter
            if category and tdata['category'] != category:
                continue

            # Tag filter
            if tags:
                if not any(tag in tdata['tags'] for tag in tags):
                    continue

            # Query search
            if query:
                searchable = f"{tid} {tdata['metadata'].get('description', '')}"
                if query.lower() not in searchable.lower():
                    continue

            results.append({
                'id': tid,
                'metadata': tdata['metadata'],
                'score': self.calculate_relevance(tdata, query, tags)
            })

        # Sort by relevance
        results.sort(key=lambda x: x['score'], reverse=True)
        return results

    def version_template(self, template_id, new_template, change_note):
        """Create new version of template"""
        current = self.templates[template_id]

        # Parse version
        version_parts = current['version'].split('.')
        version_parts[-1] = str(int(version_parts[-1]) + 1)
        new_version = '.'.join(version_parts)

        # Store old version
        archive_id = f"{template_id}_v{current['version']}"
        self.storage.archive(archive_id, current)

        # Update template
        current['template'] = new_template
        current['version'] = new_version
        current['updated_at'] = datetime.now()
        current['change_notes'] = current.get('change_notes', []) + [
            {'version': new_version, 'note': change_note, 'date': datetime.now()}
        ]

        self.storage.save(template_id, current)
\`\`\`

**Template Testing Framework:**

\`\`\`python
class TemplateTestSuite:
    def __init__(self, template):
        self.template = template
        self.test_cases = []
        self.benchmarks = []

    def add_test_case(self, inputs, expected_output_pattern, name=None):
        """Add test case for template"""
        self.test_cases.append({
            'name': name or f"test_{len(self.test_cases)}",
            'inputs': inputs,
            'expected_pattern': expected_output_pattern
        })

    def add_benchmark(self, inputs, metrics):
        """Add performance benchmark"""
        self.benchmarks.append({
            'inputs': inputs,
            'metrics': metrics  # e.g., quality score, token count
        })

    def run_tests(self, llm_provider):
        """Execute all tests"""
        results = {'passed': 0, 'failed': 0, 'details': []}

        for test in self.test_cases:
            # Render template
            prompt = self.template.render(**test['inputs'])

            # Generate output
            output = llm_provider.generate(prompt)

            # Check pattern
            import re
            if re.search(test['expected_pattern'], output):
                results['passed'] += 1
                status = 'PASS'
            else:
                results['failed'] += 1
                status = 'FAIL'

            results['details'].append({
                'test': test['name'],
                'status': status,
                'output': output[:200]
            })

        return results

    def run_benchmarks(self, llm_provider):
        """Execute performance benchmarks"""
        results = []

        for benchmark in self.benchmarks:
            prompt = self.template.render(**benchmark['inputs'])
            output = llm_provider.generate(prompt)

            # Measure actual metrics
            actual_metrics = self.measure_metrics(output)

            # Compare with expected
            performance = self.compare_metrics(
                actual_metrics,
                benchmark['metrics']
            )

            results.append({
                'inputs': benchmark['inputs'],
                'expected': benchmark['metrics'],
                'actual': actual_metrics,
                'performance': performance
            })

        return results
\`\`\`

**Template Documentation Generator:**

\`\`\`python
class TemplateDocGenerator:
    def generate_docs(self, template):
        """Generate comprehensive documentation"""
        doc = f"""
# Template: {template.metadata.get('name', 'Unnamed')}

## Description
{template.metadata.get('description', 'No description provided')}

## Version
{template.version}

## Variables
{self.document_variables(template)}

## Usage Example
\\\`\\\`\\\`python
template = get_template('{template.metadata.get("id")}')
result = template.render(
{self.generate_example_inputs(template)}
)
\\\`\\\`\\\`

## Validation Rules
{self.document_validators(template)}

## Performance Characteristics
- Average tokens: {template.metadata.get('avg_tokens', 'Unknown')}
- Success rate: {template.metadata.get('success_rate', 'Unknown')}
- Recommended for: {', '.join(template.metadata.get('use_cases', []))}

## Change History
{self.format_change_history(template)}
        """
        return doc

    def document_variables(self, template):
        docs = []
        for var in template.variables:
            var_metadata = template.metadata.get('variables', dict())
            var_desc = var_metadata.get(var, 'No description')
            var_doc = f"- {var}: {var_desc}"
            if var in template.validators:
                var_doc += " (validated)"
            docs.append(var_doc)
        return '\\n'.join(docs)
\`\`\`
        `
      },
      {
        title: 'Dynamic Template Generation',
        content: `
**Adaptive Template System:**

\`\`\`python
class AdaptiveTemplate:
    def __init__(self, base_template):
        self.base = base_template
        self.adaptations = {}
        self.performance_history = []

    def add_adaptation(self, condition, modifier):
        """Add conditional adaptation"""
        self.adaptations[condition] = modifier

    def render_adaptive(self, context, **kwargs):
        """Render with context-aware adaptations"""
        template = self.base

        # Apply adaptations based on context
        for condition, modifier in self.adaptations.items():
            if self.evaluate_condition(condition, context):
                template = modifier(template)

        # Track performance
        self.performance_history.append({
            'context': context,
            'adaptations_applied': self.get_applied_adaptations(context),
            'timestamp': datetime.now()
        })

        return template.format(**kwargs)

    def evaluate_condition(self, condition, context):
        """Evaluate if condition is met"""
        if callable(condition):
            return condition(context)
        elif isinstance(condition, str):
            return eval(condition, {'context': context})
        return False

# Example: Template that adapts to user expertise
adaptive = AdaptiveTemplate(
    base_template="Explain {concept}"
)

adaptive.add_adaptation(
    lambda ctx: ctx['expertise'] == 'beginner',
    lambda t: t + " in simple terms with examples"
)

adaptive.add_adaptation(
    lambda ctx: ctx['expertise'] == 'expert',
    lambda t: t + " with technical depth and edge cases"
)

adaptive.add_adaptation(
    lambda ctx: ctx.get('time_constraint', False),
    lambda t: t + " concisely in 2-3 sentences"
)
\`\`\`

**ML-Powered Template Optimization:**

\`\`\`python
class TemplateOptimizer:
    def __init__(self, template_library):
        self.library = template_library
        self.performance_model = self.train_performance_model()

    def train_performance_model(self):
        """Train model to predict template performance"""
        from sklearn.ensemble import RandomForestRegressor

        # Collect historical data
        X, y = self.prepare_training_data()

        # Train model
        model = RandomForestRegressor(n_estimators=100)
        model.fit(X, y)

        return model

    def suggest_template(self, task_description, context):
        """Suggest best template for task"""
        candidates = self.library.search_templates(query=task_description)

        scored_candidates = []
        for candidate in candidates:
            # Feature extraction
            features = self.extract_features(candidate, task_description, context)

            # Predict performance
            predicted_score = self.performance_model.predict([features])[0]

            scored_candidates.append({
                'template': candidate,
                'predicted_score': predicted_score
            })

        # Return top suggestion
        scored_candidates.sort(key=lambda x: x['predicted_score'], reverse=True)
        return scored_candidates[0]['template']

    def auto_improve_template(self, template_id, performance_data):
        """Automatically improve underperforming templates"""
        template = self.library.get_template(template_id)

        # Analyze failure patterns
        failures = [d for d in performance_data if not d['success']]
        patterns = self.analyze_failure_patterns(failures)

        # Generate improvements
        improvements = []
        for pattern in patterns:
            if pattern['type'] == 'missing_instruction':
                improvements.append(f"Add: {pattern['suggested_instruction']}")
            elif pattern['type'] == 'ambiguous_format':
                improvements.append(f"Clarify format: {pattern['format_spec']}")
            elif pattern['type'] == 'insufficient_context':
                improvements.append(f"Add context: {pattern['context_type']}")

        # Create improved version
        improved_template = self.apply_improvements(template, improvements)

        # A/B test against original
        return self.validate_improvement(template, improved_template)
\`\`\`

**Template Generation from Examples:**

\`\`\`python
class TemplateInducer:
    def induce_template(self, examples):
        """Generate template from input-output examples"""
        # Find common structure
        common_structure = self.find_common_patterns(examples)

        # Identify variables
        variables = self.identify_variables(examples, common_structure)

        # Build template
        template_str = common_structure
        for var in variables:
            template_str = template_str.replace(var['literal'], f"{{{var['name']}}}")

        # Generate metadata
        metadata = {
            'induced': True,
            'source_examples': len(examples),
            'confidence': self.calculate_confidence(examples, template_str),
            'variables': {var['name']: var['description'] for var in variables}
        }

        return PromptTemplate(template_str, metadata)

    def find_common_patterns(self, examples):
        """Extract common patterns across examples"""
        from difflib import SequenceMatcher

        # Start with first example as base
        common = examples[0]['input']

        for example in examples[1:]:
            # Find longest common subsequence
            matcher = SequenceMatcher(None, common, example['input'])
            matches = matcher.get_matching_blocks()

            # Build new common pattern
            new_common = []
            for match in matches:
                new_common.append(common[match.a:match.a + match.size])

            common = ''.join(new_common)

        return common

# Example usage
inducer = TemplateInducer()

examples = [
    {
        'input': "Analyze sales data for Q1 2024 and identify trends",
        'output': "Sales analysis with trend identification"
    },
    {
        'input': "Analyze customer data for March 2024 and identify patterns",
        'output': "Customer analysis with pattern identification"
    }
]

induced_template = inducer.induce_template(examples)
# Result: "Analyze {data_type} data for {time_period} and identify {analysis_focus}"
\`\`\`
        `
      },
      {
        title: 'Template Security and Governance',
        content: `
**Security Framework:**

\`\`\`python
class SecureTemplateSystem:
    def __init__(self):
        self.sanitizer = InputSanitizer()
        self.injection_detector = InjectionDetector()
        self.audit_log = AuditLog()

    def validate_template_safety(self, template):
        """Check template for security issues"""
        issues = []

        # Check for injection vulnerabilities
        injection_risks = self.injection_detector.scan(template)
        if injection_risks:
            issues.extend(injection_risks)

        # Check for data leakage risks
        if self.contains_sensitive_patterns(template):
            issues.append("Template may expose sensitive data")

        # Check for uncontrolled generation
        if not self.has_output_constraints(template):
            issues.append("Template lacks output constraints")

        return {'safe': len(issues) == 0, 'issues': issues}

    def sanitize_inputs(self, inputs):
        """Sanitize user inputs before template rendering"""
        sanitized = {}

        for key, value in inputs.items():
            # Remove potential injection attempts
            cleaned = self.sanitizer.clean(value)

            # Validate against whitelist
            if not self.is_valid_input(cleaned):
                raise ValueError(f"Invalid input for {key}")

            sanitized[key] = cleaned

        return sanitized

    def render_secure(self, template, inputs, user):
        """Secure template rendering with full audit trail"""
        # Validate template
        safety_check = self.validate_template_safety(template)
        if not safety_check['safe']:
            self.audit_log.log_security_event(user, template, safety_check['issues'])
            raise SecurityError(f"Template failed safety check: {safety_check['issues']}")

        # Sanitize inputs
        safe_inputs = self.sanitize_inputs(inputs)

        # Log access
        self.audit_log.log_access(user, template, safe_inputs)

        # Render with timeout
        try:
            result = self.render_with_timeout(template, safe_inputs, timeout=5)
        except TimeoutError:
            self.audit_log.log_timeout(user, template)
            raise

        # Validate output
        if self.contains_sensitive_data(result):
            self.audit_log.log_data_leak_attempt(user, template, result)
            raise SecurityError("Output contains sensitive data")

        return result

class InjectionDetector:
    def scan(self, template):
        """Detect potential injection attacks"""
        risks = []

        # Check for command injection patterns
        dangerous_patterns = [
            r'\\$\\{.*\\}',      # Shell expansion
            r'\\u0060.*\\u0060', # Command substitution (backticks as unicode)
            r'eval\\(',          # Eval functions
            r'exec\\(',          # Exec functions
            r'__.*__',           # Python magic methods
        ]

        for pattern in dangerous_patterns:
            if re.search(pattern, template):
                risks.append(f"Potential injection: {pattern}")

        return risks
\`\`\`

**Access Control and Permissions:**

\`\`\`python
class TemplateAccessControl:
    def __init__(self):
        self.permissions = {}
        self.roles = {}
        self.template_owners = {}

    def define_role(self, role_name, permissions):
        """Define role with specific permissions"""
        self.roles[role_name] = permissions

    def assign_role(self, user, role):
        """Assign role to user"""
        if user not in self.permissions:
            self.permissions[user] = set()
        self.permissions[user].update(self.roles[role])

    def set_template_permissions(self, template_id, permissions):
        """Set granular permissions for template"""
        self.template_permissions[template_id] = permissions

    def can_access(self, user, template_id, action='read'):
        """Check if user can perform action on template"""
        # Check ownership
        if template_id in self.template_owners:
            if self.template_owners[template_id] == user:
                return True

        # Check role permissions
        user_perms = self.permissions.get(user, set())
        if f"template:{action}:*" in user_perms:
            return True
        if f"template:{action}:{template_id}" in user_perms:
            return True

        # Check template-specific permissions
        template_perms = self.template_permissions.get(template_id, dict())
        if user in template_perms.get(action, []):
            return True

        return False

# Role definitions
access_control = TemplateAccessControl()

access_control.define_role('developer', {
    'template:read:*',
    'template:create:*',
    'template:test:*'
})

access_control.define_role('admin', {
    'template:read:*',
    'template:create:*',
    'template:modify:*',
    'template:delete:*',
    'template:approve:*'
})

access_control.define_role('viewer', {
    'template:read:*'
})
\`\`\`

**Compliance and Audit:**

\`\`\`python
class TemplateCompliance:
    def __init__(self, regulations):
        self.regulations = regulations  # e.g., GDPR, HIPAA
        self.audit_trail = []

    def check_compliance(self, template, context):
        """Check template compliance with regulations"""
        violations = []

        for regulation in self.regulations:
            if regulation == 'GDPR':
                violations.extend(self.check_gdpr_compliance(template, context))
            elif regulation == 'HIPAA':
                violations.extend(self.check_hipaa_compliance(template, context))

        return {'compliant': len(violations) == 0, 'violations': violations}

    def check_gdpr_compliance(self, template, context):
        violations = []

        # Check for personal data processing
        if 'personal_data' in context and not context.get('consent'):
            violations.append("Processing personal data without consent")

        # Check for data retention
        if not template.metadata.get('data_retention_policy'):
            violations.append("No data retention policy specified")

        # Check for right to explanation
        if 'automated_decision' in context and not 'explanation' in template.template:
            violations.append("Automated decision without explanation")

        return violations

    def generate_compliance_report(self, template_library):
        """Generate compliance report for all templates"""
        report = {
            'timestamp': datetime.now(),
            'total_templates': len(template_library.templates),
            'compliant': 0,
            'non_compliant': 0,
            'details': []
        }

        for template_id, template in template_library.templates.items():
            compliance = self.check_compliance(template, template.metadata)

            if compliance['compliant']:
                report['compliant'] += 1
            else:
                report['non_compliant'] += 1

            report['details'].append({
                'template_id': template_id,
                'compliant': compliance['compliant'],
                'violations': compliance['violations']
            })

        return report
\`\`\`
        `
      },
      {
        title: 'Production Template Systems',
        content: `
**Complete Production Framework:**

\`\`\`python
class ProductionPromptSystem:
    def __init__(self, config):
        self.library = PromptLibrary(config['storage'])
        self.cache = DistributedCache(config['cache'])
        self.monitor = PerformanceMonitor()
        self.optimizer = TemplateOptimizer(self.library)
        self.security = SecureTemplateSystem()
        self.compliance = TemplateCompliance(config['regulations'])

    async def execute_prompt(self, template_id, inputs, context):
        """Execute prompt with full production features"""
        # Get template (with caching)
        template = await self.get_template_cached(template_id)

        # Security validation
        self.security.validate_template_safety(template)
        safe_inputs = self.security.sanitize_inputs(inputs)

        # Compliance check
        compliance = self.compliance.check_compliance(template, context)
        if not compliance['compliant']:
            raise ComplianceError(compliance['violations'])

        # Select best variant (if A/B testing)
        if template.has_variants():
            template = self.select_variant(template, context)

        # Render prompt
        prompt = template.render(**safe_inputs)

        # Execute with monitoring
        start_time = time.time()
        try:
            result = await self.execute_with_retry(prompt, context)
            success = True
        except Exception as e:
            result = None
            success = False
            self.monitor.log_error(template_id, str(e))

        # Log metrics
        self.monitor.log_execution({
            'template_id': template_id,
            'latency': time.time() - start_time,
            'success': success,
            'tokens': count_tokens(prompt + (result or '')),
            'context': context
        })

        # Update optimization model
        if success:
            self.optimizer.record_success(template_id, context, result)

        return result

    async def get_template_cached(self, template_id):
        """Get template with caching"""
        # Check cache
        cached = await self.cache.get(f"template:{template_id}")
        if cached:
            return cached

        # Load from library
        template = self.library.get_template(template_id)

        # Cache for future use
        await self.cache.set(f"template:{template_id}", template, ttl=3600)

        return template

    def select_variant(self, template, context):
        """Select best template variant based on context"""
        if self.is_experimentation_enabled(template):
            # A/B testing mode
            return self.ab_test_selector.select(template.variants)
        else:
            # Use ML model to select best variant
            return self.optimizer.suggest_variant(template.variants, context)

    async def execute_with_retry(self, prompt, context, max_retries=3):
        """Execute with exponential backoff retry"""
        for attempt in range(max_retries):
            try:
                return await self.llm_provider.generate(prompt)
            except RateLimitError:
                if attempt == max_retries - 1:
                    raise
                await asyncio.sleep(2 ** attempt)
            except Exception as e:
                if attempt == max_retries - 1:
                    raise
                self.monitor.log_retry(attempt, str(e))

class TemplateDevOps:
    """CI/CD for prompt templates"""

    def __init__(self):
        self.test_suite = TemplateTestSuite()
        self.deployment = TemplateDeployment()
        self.rollback = RollbackManager()

    def deploy_template(self, template, environment='staging'):
        """Deploy template through stages"""
        # Run tests
        test_results = self.test_suite.run_all_tests(template)
        if test_results['failed'] > 0:
            raise DeploymentError(f"Tests failed: {test_results}")

        # Deploy to staging
        if environment == 'staging':
            self.deployment.deploy_staging(template)
            # Run smoke tests
            smoke_results = self.run_smoke_tests(template, 'staging')
            if not smoke_results['passed']:
                self.rollback.rollback_staging(template)
                raise DeploymentError("Smoke tests failed")

        # Deploy to production (with canary)
        elif environment == 'production':
            # Start with 5% traffic
            self.deployment.deploy_canary(template, percentage=5)

            # Monitor for 1 hour
            metrics = self.monitor_canary(template, duration=3600)

            if metrics['error_rate'] > 0.01:  # 1% error threshold
                self.rollback.rollback_canary(template)
                raise DeploymentError(f"High error rate: {metrics['error_rate']}")

            # Gradual rollout
            for percentage in [25, 50, 100]:
                self.deployment.increase_canary(template, percentage)
                time.sleep(1800)  # 30 minutes per stage

                metrics = self.monitor_canary(template, duration=1800)
                if metrics['error_rate'] > 0.01:
                    self.rollback.rollback_canary(template)
                    raise DeploymentError(f"Rollout failed at {percentage}%")

        return {'status': 'deployed', 'environment': environment}
\`\`\`

**Template Analytics Dashboard:**

\`\`\`python
class TemplateAnalytics:
    def generate_dashboard_metrics(self):
        return {
            'usage': {
                'total_executions': self.get_total_executions(),
                'unique_users': self.get_unique_users(),
                'peak_usage_time': self.get_peak_usage(),
                'trending_templates': self.get_trending_templates()
            },
            'performance': {
                'avg_latency': self.get_average_latency(),
                'success_rate': self.get_success_rate(),
                'token_efficiency': self.get_token_efficiency(),
                'cost_per_execution': self.calculate_cost()
            },
            'quality': {
                'user_satisfaction': self.get_satisfaction_score(),
                'output_quality': self.get_quality_metrics(),
                'error_patterns': self.analyze_errors(),
                'improvement_opportunities': self.identify_improvements()
            },
            'compliance': {
                'regulation_adherence': self.check_all_compliance(),
                'security_incidents': self.get_security_incidents(),
                'audit_trail': self.get_recent_audits()
            }
        }

# Real-time monitoring
class TemplateMonitor:
    def setup_alerts(self):
        self.add_alert('high_error_rate', threshold=0.05, action='page_oncall')
        self.add_alert('slow_response', threshold=5000, action='notify_team')
        self.add_alert('token_spike', threshold=10000, action='throttle')
        self.add_alert('security_violation', threshold=1, action='immediate_block')
\`\`\`
        `
      }
    ],

    practicalExample: {
      title: 'Building an Enterprise Customer Service Template System',
      scenario: 'Create a comprehensive template system for a global customer service operation',
      challenge: 'Handle multiple languages, products, regulations, and service levels with consistency',
      approach: `
**Multi-Tenant Template System Implementation:**

\`\`\`python
class CustomerServiceTemplateSystem:
    def __init__(self):
        self.base_templates = self.initialize_base_templates()
        self.localizations = {}
        self.product_adaptations = {}
        self.compliance_rules = {}

    def initialize_base_templates(self):
        """Create foundational templates"""
        templates = {}

        # Base response template
        templates['base_response'] = PromptTemplate("""
{greeting}

{acknowledgment}

{solution}

{closing}

{signature}
""")

        # Issue resolution template
        templates['issue_resolution'] = PromptTemplate("""
You are a {service_level} customer service representative.
Customer Profile: {customer_profile}
Issue: {issue_description}
Product: {product}
History: {interaction_history}

Provide a solution that:
1. Addresses the immediate issue
2. Prevents future occurrences
3. Maintains customer satisfaction
4. Complies with {regulations}

Tone: {tone_directive}
Language: {language}
Format: {response_format}
""")

        # Escalation template
        templates['escalation'] = PromptTemplate("""
ESCALATION REQUIRED
Priority: {priority}
Customer: {customer_id} ({customer_tier})
Issue: {issue_summary}
Attempted Solutions: {previous_attempts}
Escalation Reason: {escalation_reason}

Generate:
1. Escalation summary for technical team
2. Customer communication about escalation
3. Expected resolution timeline
""")

        return templates

    def create_localized_template(self, base_template_id, language, cultural_adaptations):
        """Create language and culture-specific versions"""
        base = self.base_templates[base_template_id]

        localized = PromptTemplate(base.template, base.metadata.copy())

        # Language-specific modifications
        if language == 'Japanese':
            localized.metadata['greeting_style'] = 'formal'
            localized.metadata['honorifics'] = 'required'
            localized.add_transformer('greeting',
                lambda g: f"いらっしゃいませ。{g}")
        elif language == 'Spanish':
            localized.metadata['greeting_style'] = 'warm'
            localized.add_transformer('greeting',
                lambda g: f"¡Hola! {g}")

        # Cultural adaptations
        for adaptation in cultural_adaptations:
            localized.add_validator(adaptation['field'], adaptation['validator'])

        self.localizations[f"{base_template_id}_{language}"] = localized
        return localized

    def create_product_specific_template(self, base_template_id, product_line):
        """Adapt templates for specific products"""
        base = self.base_templates[base_template_id]

        if product_line == 'software':
            additions = """
Technical Details:
- Version: {software_version}
- OS: {operating_system}
- Error Code: {error_code}
- Logs: {log_snippet}

Include:
- Troubleshooting steps
- Known issues check
- Update recommendations
"""
        elif product_line == 'hardware':
            additions = """
Device Information:
- Model: {device_model}
- Serial: {serial_number}
- Warranty Status: {warranty_status}
- Purchase Date: {purchase_date}

Include:
- Physical inspection steps
- Warranty coverage
- Replacement/repair options
"""
        elif product_line == 'subscription':
            additions = """
Account Details:
- Subscription Tier: {subscription_tier}
- Billing Cycle: {billing_cycle}
- Next Renewal: {renewal_date}
- Payment Method: {payment_method}

Include:
- Billing clarification
- Upgrade/downgrade options
- Cancellation policy
"""

        product_template = PromptTemplate(
            base.template + additions,
            {**base.metadata, 'product_line': product_line}
        )

        self.product_adaptations[f"{base_template_id}_{product_line}"] = product_template
        return product_template

    def select_optimal_template(self, context):
        """Intelligently select best template for situation"""
        # Determine base template needed
        if context['needs_escalation']:
            base_id = 'escalation'
        else:
            base_id = 'issue_resolution'

        # Check for product-specific version
        product_key = f"{base_id}_{context['product_line']}"
        if product_key in self.product_adaptations:
            template = self.product_adaptations[product_key]
        else:
            template = self.base_templates[base_id]

        # Apply localization
        language_key = f"{base_id}_{context['language']}"
        if language_key in self.localizations:
            template = self.localizations[language_key]

        # Apply compliance modifications
        if context['region'] in self.compliance_rules:
            template = self.apply_compliance(template, context['region'])

        return template

    def execute_customer_service_flow(self, ticket):
        """Complete customer service workflow"""
        # Analyze ticket
        context = self.analyze_ticket(ticket)

        # Select template
        template = self.select_optimal_template(context)

        # Prepare inputs
        inputs = {
            'service_level': self.determine_service_level(ticket['customer']),
            'customer_profile': self.get_customer_profile(ticket['customer_id']),
            'issue_description': ticket['description'],
            'product': ticket['product'],
            'interaction_history': self.get_history(ticket['customer_id']),
            'regulations': self.get_applicable_regulations(ticket),
            'tone_directive': self.determine_tone(ticket),
            'language': ticket['language'],
            'response_format': 'email'
        }

        # Validate inputs
        validation_result = template.validate_inputs(inputs)
        if not validation_result['valid']:
            # Handle missing information
            inputs = self.request_missing_info(inputs, validation_result['missing'])

        # Generate response
        response = self.generate_response(template, inputs)

        # Quality check
        quality_score = self.check_response_quality(response, ticket)

        if quality_score < 0.8:
            # Regenerate with enhanced template
            enhanced_template = self.enhance_template(template, quality_score)
            response = self.generate_response(enhanced_template, inputs)

        # Compliance check
        compliance_check = self.check_compliance(response, ticket)
        if not compliance_check['compliant']:
            response = self.fix_compliance_issues(response, compliance_check)

        # Personalization
        response = self.personalize_response(response, ticket['customer'])

        # Log and return
        self.log_interaction(ticket, template, response, quality_score)

        return {
            'response': response,
            'quality_score': quality_score,
            'template_used': template.metadata['id'],
            'personalizations_applied': self.get_personalizations(),
            'compliance_status': compliance_check
        }

# Deployment
system = CustomerServiceTemplateSystem()

# Create product-specific templates
system.create_product_specific_template('issue_resolution', 'software')
system.create_product_specific_template('issue_resolution', 'hardware')
system.create_product_specific_template('issue_resolution', 'subscription')

# Create localizations
system.create_localized_template('issue_resolution', 'Spanish', [])
system.create_localized_template('issue_resolution', 'Japanese', [])
system.create_localized_template('issue_resolution', 'French', [])

# Process ticket
ticket = {
    'customer_id': 'CUST-12345',
    'description': 'Software crashes when opening large files',
    'product': 'PhotoEditor Pro',
    'language': 'English',
    'priority': 'high',
    'customer': {'tier': 'premium', 'tenure_months': 24}
}

result = system.execute_customer_service_flow(ticket)

print(f"""
Response Generated:
Quality Score: {result['quality_score']:.1%}
Template Used: {result['template_used']}
Compliance: {result['compliance_status']['compliant']}
""")
\`\`\`

**Results:**
- Response time: Reduced from 15 min to 30 seconds
- Consistency score: Improved from 65% to 94%
- Customer satisfaction: Increased from 3.8 to 4.6/5
- Compliance violations: Reduced by 89%
- Agent productivity: Increased by 280%
- Training time: Reduced from 6 weeks to 2 weeks
      `
    },

    quiz: [
      {
        question: 'What is the primary benefit of using prompt template systems?',
        options: [
          'Reduced token usage',
          'Faster response generation',
          'Consistency and maintainability at scale',
          'Elimination of prompt engineering'
        ],
        correctAnswer: 2,
        explanation: 'Template systems provide consistency, maintainability, version control, and governance at scale across teams and applications.'
      },
      {
        question: 'Which is NOT a key component of a production template system?',
        options: [
          'Version control',
          'Access control',
          'Manual prompt writing for each request',
          'Performance monitoring'
        ],
        correctAnswer: 2,
        explanation: 'Production template systems specifically avoid manual prompt writing for each request, instead using reusable, tested templates.'
      }
    ],

    exercises: [
      {
        title: 'Build a Template Inheritance System',
        description: 'Create a system where templates can inherit and override properties from parent templates',
        hints: [
          'Implement parent-child relationships',
          'Handle multiple inheritance',
          'Resolve conflicts in inheritance chain'
        ]
      },
      {
        title: 'Create an Auto-Optimization System',
        description: 'Build a system that automatically improves templates based on performance data',
        hints: [
          'Track success metrics',
          'Identify failure patterns',
          'Generate and test improvements automatically'
        ]
      }
    ],

    references: [
      'LangChain (2024) - Prompt Template Best Practices',
      'Anthropic (2024) - Enterprise Prompt Management',
      'OpenAI (2024) - Scaling GPT Applications',
      'Google (2023) - Template Systems for Large Language Models'
    ]
  }
};