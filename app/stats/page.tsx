import type { Metadata } from "next"
import StatsOverview from "@/components/stats/stats-overview"
import VisitorChart from "@/components/stats/vistor-chart"
import TopPagesCard from "@/components/stats/top-pages-card"
import TopReferrersCard from "@/components/stats/top-referrers-card"
import BrowsersCard from "@/components/stats/browsers-card"
import DevicesCard from "@/components/stats/devices-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Website Analytics | Dashboard",
  description: "Track your website visitors and page views",
}

export default function StatsPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Website Analytics</h1>
        <p className="text-muted-foreground">Track your website visitors, page views, and more</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatsOverview />
          <VisitorChart />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TopPagesCard />
            <TopReferrersCard />
            <BrowsersCard />
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <TopPagesCard fullView />
        </TabsContent>

        <TabsContent value="referrers" className="space-y-4">
          <TopReferrersCard fullView />
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DevicesCard />
            <BrowsersCard fullView />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
