# Feature Management Improv
## Reduce Risk, Conquer Compliance, and Perfect Previews with OpenFeature
### KubeCon EU '24

This is a demo for KubeCon EU '24.

Running locally:

1. install npm, node and docker
1. `cd app && npm install`
1. `npm run flagd`
1. `npm run start`

Visit the app at `localhost:3000`.
Change flag values in `app/flags/dev-flags.yaml` and observe the results.

Understanding the app:

This simple node app serves a very basic "pug" template [here](https://github.com/open-feature/kubecon-eu-2024-demo/blob/main/app/views/index.pug).
The template is served by a simple express request handler [here](https://github.com/open-feature/kubecon-eu-2024-demo/blob/main/app/handlers/index.ts).
The request handler uses the OpenFeature server SDK for Javascript to evaluate 2 feature flags, one controlling the rendered emoji, and the other controlling the background color.
The feature flags and targeting rules are defined in [dev-flags.yaml](https://github.com/open-feature/kubecon-eu-2024-demo/blob/main/app/flags/dev-flags.yaml) (locally) and [resources.yaml](https://github.com/open-feature/kubecon-eu-2024-demo/blob/main/resources.yaml) (if deployed in GKE).
