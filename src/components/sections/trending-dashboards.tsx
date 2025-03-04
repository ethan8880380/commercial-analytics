import { Button } from "@/components/ui/button";

export function TrendingDashboards() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="mb-2">
          <span className="text-blue-600 font-medium">KCNA Commercial Analytics</span>
        </div>
        <h2 className="text-3xl font-bold mb-12">Trending Dashboards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Card 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">All Outlet Central</h3>
              <p className="text-gray-600 mb-6">
                Provides a comprehensive overview of sales performance across all channels (Includes 
                Costco and Amazon). It includes dollars and Eq sales data only.
              </p>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    General Access
                  </Button>
                  <Button variant="outline" size="sm" className="bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100">
                    Office Hour Demo
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 pl-0">
                  Learn More →
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Card 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Consumptions Trend Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Inform business teams on market performance to improve forecast accuracy within S&OP
              </p>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    General Access
                  </Button>
                  <Button variant="outline" size="sm" className="bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100">
                    Office Hour Demo
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 pl-0">
                  Learn More →
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Card 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">The Executive Market Share Dashboard</h3>
              <p className="text-gray-600 mb-6">
                A tool that helps executives track KC market share performance using All Outlet Central data
              </p>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    General Access
                  </Button>
                  <Button variant="outline" size="sm" className="bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100">
                    Office Hour Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 