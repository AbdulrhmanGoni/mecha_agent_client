<script>
	import SupportEmail from '$lib/components/shared/SupportEmail.svelte';
</script>

<div class="px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold">Privacy Policy</h1>
	<p class="secondary-text-color mb-8 text-sm">Effective Date: June 2, 2025</p>

	<section class="mb-10">
		<p>
			Thank you for using our service. This Privacy Policy explains how we collect, use, and protect
			your personal information when you use our application.
		</p>
	</section>

	<section class="mb-10">
		<h2 class="mb-2 text-xl font-semibold">1. Information We Collect</h2>
		<ul class="ms-4 list-disc space-y-2 pl-5 text-base">
			<li>
				<strong>Personal Information:</strong>
				<ul class="list-disc space-y-2 pl-5 text-base">
					<li>Name</li>
					<li>Email address</li>
					<li>Avatar image (if available)</li>
				</ul>
			</li>
			<li>
				<strong>Usage Data:</strong>
				<ul class="list-disc space-y-2 pl-5 text-base">
					<li>Number of daily inferences (how often your AI agent chatbots are used).</li>
					<li>Number of agents, datasets and API keys you create.</li>
				</ul>
			</li>
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="mb-2 text-xl font-semibold">2. How We Use Your Information</h2>
		<ul class="ms-4 list-disc space-y-2 pl-5 text-base">
			<li>To provide, maintain, and improve the service</li>
			<li>To apply rate limits for accounts based on usage</li>
			<li>To contact you if necessary (e.g., account issues, support)</li>
			<li>To process payments using Stripe</li>
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="mb-2 text-xl font-semibold">3. Sharing of Information</h2>
		<p class="mb-2 text-base">We share your data only with essential third-party services:</p>
		<ul class="ms-4 list-disc space-y-2 pl-5 text-base">
			<li>
				<strong>Stripe:</strong> If you decided to subscripe to a paid plan, We share only your email
				address for billing and subscription purposes.
			</li>
			<li>We do <strong>not</strong> sell or rent your personal data.</li>
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="mb-2 text-xl font-semibold">4. Data Security</h2>
		<ul class="ms-4 list-disc space-y-2 pl-5 text-base">
			<li>HTTPS encryption for all data transmission</li>
			<li>Secure, HTTPS-only cookies</li>
			<li>Use of trusted, secure third-party services</li>
		</ul>
	</section>

	<section class="mb-10">
		<h2 class="mb-2 text-xl font-semibold">5. Your Rights</h2>
		<p class="mb-2 text-base">You have the right to:</p>
		<ul class="ms-4 list-disc space-y-2 pl-5 text-base">
			<li>Access the data we store about you</li>
			<li>Request correction or deletion of your data</li>
			<li>Withdraw consent at any time (which may limit app functionality)</li>
		</ul>
		<p class="mt-4">
			To exercise your rights, contact us at:
			<SupportEmail className="font-semibold hover:underline" />
		</p>
	</section>

	<section class="mb-10">
		<h2 class="mb-2 text-xl font-semibold">6. Changes to This Policy</h2>
		<p class="text-base">
			We may update this Privacy Policy occasionally. We'll notify you by email or by updating this
			page. Continued use of the service implies acceptance of the new terms.
		</p>
	</section>

	<section>
		<h2 class="mb-2 text-xl font-semibold">7. Contact Us</h2>
		<p class="text-base">
			For any questions or concerns about this Privacy Policy, contact us at:
			<SupportEmail className="font-semibold hover:underline" />
		</p>
	</section>
</div>
