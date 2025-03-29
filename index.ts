import { serve } from "./quartz"

export default {
  async fetch(request, env, ctx) {
    return await serve(request, env, ctx)
  }
}
