import { App } from "vue"
import Placeholder from '@/components/common/placeholder'
import { Responsive, DesktopOnly } from '@/components/common/responsive'
import Container from '@/components/common/container'

export const install = (app: App) => {
  app.component(Responsive.name, Responsive)
  app.component(DesktopOnly.name, DesktopOnly)
  app.component(Container.name, Container)
  app.component(Placeholder.name, Placeholder)
}