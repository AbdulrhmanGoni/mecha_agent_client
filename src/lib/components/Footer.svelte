<script>
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<footer class="card w-full">
	<div class="container px-2 py-6">
		<div class="md:flex md:justify-between">
			<div class="mb-6 space-y-4 md:mb-0">
				<div class="flex items-center gap-3">
					<Avatar width="w-10" src="/mecha_agent_logo.webp">MA</Avatar>
					<h1 class="gradient-heading text-2xl font-extrabold">Mecha Agent</h1>
				</div>
				<p class="secondary-text-color max-w-[470px]">
					Mecha Agent application is where you create and publish your AI agent assistant to the
					public so the people can ask it questions and it answers based on a dataset you create.
				</p>
			</div>
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
				<div>
					<h2 class="mb-6 font-bold">INTEGRATIONS</h2>
					<ul class="secondary-text-color font-medium">
						<li class="mb-4">
							<a href="https://llms-tdm.abdulrhman.icu" class="hover:underline">Datasets</a>
						</li>
						<li class="mb-4">
							<a
								href="https://github.com/AbdulrhmanGoni/mecha-agent-inference-client"
								class="hover:underline">Inference Client</a
							>
						</li>
					</ul>
				</div>
				<div>
					<h2 class="mb-6 font-bold">LEGAL</h2>
					<ul class="secondary-text-color font-medium">
						<li class="mb-4">
							<a href="/privacy" class="hover:underline">Privacy Policy</a>
						</li>
						<li>
							<a href="/terms-and-conditions" class="hover:underline">Terms &amp; Conditions</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="my-6 border-gray-200 lg:my-8 dark:border-gray-700" />
		<div class="flex flex-wrap justify-between gap-4 text-sm sm:items-center">
			<span class="secondary-text-color sm:text-center">
				© {new Date().getFullYear()}
				<a href="https://github.com/AbdulrhmanGoni/mecha_agent_client" class="hover:underline">
					Mecha Agent
				</a>
				. All Rights Reserved.
			</span>
			<div class="flex items-center gap-4 sm:mt-0 sm:justify-center">
				<p class="space-x-0.5">
					<span class="secondary-text-color">Created by</span>
					<a class="hover:underline" href="https://abdulrhmangoni.github.io/my-portfolio/">
						"Abdulrhman Goni"
					</a>
				</p>
				<a
					href="https://github.com/AbdulrhmanGoni"
					aria-label="Abdulrhman Goni's Github account"
					target="_blank"
				>
					<span class="iconify size-5 hugeicons--github"></span>
				</a>
				<a
					href="https://www.linkedin.com/in/abdulrhman-goni-857a36275"
					aria-label="Abdulrhman Goni's LinkedIn account"
					target="_blank"
				>
					<span class="iconify size-5 hugeicons--linkedin-02"></span>
				</a>
				<a
					href="https://x.com/AbdulrhmanGoni"
					aria-label="Abdulrhman Goni's X account"
					target="_blank"
				>
					<span class="iconify size-5 hugeicons--new-twitter"></span>
				</a>
				<a href="mailto:abdulrhmangoni@gmail.com" aria-label="Abdulrhman Goni's email address">
					<span class="iconify size-5 hugeicons--mail-at-sign-01"></span>
				</a>
			</div>
		</div>
	</div>
</footer>
