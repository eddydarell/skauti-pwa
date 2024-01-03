import 'vuetify/styles'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labComponents from 'vuetify/labs/components'
import { mdi } from 'vuetify/iconsets/mdi'
import { aliases, fa } from 'vuetify/iconsets/fa'

import type { UserModule } from '~/types'

export const install: UserModule = ({ app, isClient }) => {
  if (!isClient)
    return
  const vuetify = createVuetify({
    components: { ...components, ...labComponents },
    directives,
    icons: {
      defaultSet: 'fa',
      aliases: {
        ...aliases,
        'mdi-close-circle': 'i-carbon-close',
      },
      sets: {
        fa,
        mdi,
      },
    },
  })

  app.use(vuetify)
}
