import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

const VoyantPeerMultipleValuation = () => {
  const voyantRevenue2030 = 608.1; // $M
  const currentValuation = 776; // $M
  
  // Peer multiples from comp analysis
  const valuationData = [
    { 
      scenario: 'Current DCF\nValuation',
      valuation: 776,
      multiple: 1.28,
      type: 'current',
      color: '#3b82f6',
      description: '1.3x multiple'
    },
    { 
      scenario: 'At Silicon\nPhotonics Multiple',
      valuation: voyantRevenue2030 * 5.77,
      multiple: 5.77,
      type: 'peer',
      color: '#8b5cf6',
      description: '5.8x multiple'
    },
    { 
      scenario: 'At AI/Vision\nMultiple',
      valuation: voyantRevenue2030 * 7.58,
      multiple: 7.58,
      type: 'peer',
      color: '#10b981',
      description: '7.6x multiple'
    },
    { 
      scenario: 'At Lidar\nMultiple',
      valuation: voyantRevenue2030 * 8.99,
      multiple: 8.99,
      type: 'peer',
      color: '#f59e0b',
      description: '9.0x multiple'
    }
  ];

  const formatValue = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}B`;
    }
    return `$${value.toFixed(0)}M`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-xl">
          <p className="font-bold text-gray-900 text-lg mb-1">{data.scenario.replace('\n', ' ')}</p>
          <p className="text-gray-600 text-sm mb-2">{data.description}</p>
          <p className="text-3xl font-bold mb-2" style={{ color: data.color }}>
            {formatValue(data.valuation)}
          </p>
          {data.type === 'peer' && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-600">Upside from current:</p>
              <p className="text-lg font-bold text-emerald-600">
                {((data.valuation / currentValuation - 1) * 100).toFixed(0)}%
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Voyant Valuation at Peer Multiples
          </h1>
          <p className="text-xl text-gray-600">
            Applying Industry Multiples to Voyant's 2030 Revenue ($608M)
          </p>
        </div>

        {/* Key Message */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🚀</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Multiple Expansion Opportunity</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Voyant is currently valued at <span className="font-bold text-blue-600">1.3x revenue</span> based on DCF analysis. 
                However, applying <span className="font-bold text-emerald-600">peer group multiples</span> of 5.8-9.0x to 
                Voyant's projected 2030 revenue of <span className="font-bold">$608M</span> implies enterprise values ranging from 
                <span className="font-bold text-purple-600"> $3.5B to $5.5B</span>, representing 
                <span className="font-bold text-amber-600"> 4.5x to 7.0x upside</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Voyant Enterprise Value Under Different Multiple Scenarios
          </h2>
          
          <ResponsiveContainer width="100%" height={450}>
            <BarChart 
              data={valuationData}
              margin={{ top: 20, right: 60, left: 80, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis 
                dataKey="scenario"
                tick={{ fontSize: 13, fontWeight: 600 }}
                height={80}
              />
              <YAxis 
                label={{ 
                  value: 'Enterprise Value ($M)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: 14, fontWeight: 600 }
                }}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value >= 1000 ? `$${(value / 1000).toFixed(0)}B` : `$${value}M`}
                domain={[0, 6000]}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar dataKey="valuation" radius={[12, 12, 0, 0]} barSize={120}>
                {valuationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Valuation Scenarios */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Valuation Scenarios</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Current DCF</span>
                  <span className="text-xs bg-white px-2 py-1 rounded font-semibold">1.3x</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">$776M</div>
                <div className="text-xs text-gray-600 mt-1">Conservative base case</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Silicon Photonics</span>
                  <span className="text-xs bg-white px-2 py-1 rounded font-semibold">5.8x</span>
                </div>
                <div className="text-3xl font-bold text-purple-600">$3.51B</div>
                <div className="text-xs text-purple-700 mt-1 font-semibold">352% upside</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">AI/Computer Vision</span>
                  <span className="text-xs bg-white px-2 py-1 rounded font-semibold">7.6x</span>
                </div>
                <div className="text-3xl font-bold text-emerald-600">$4.61B</div>
                <div className="text-xs text-emerald-700 mt-1 font-semibold">494% upside</div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">Lidar Companies</span>
                  <span className="text-xs bg-white px-2 py-1 rounded font-semibold">9.0x</span>
                </div>
                <div className="text-3xl font-bold text-amber-600">$5.47B</div>
                <div className="text-xs text-amber-700 mt-1 font-semibold">605% upside</div>
              </div>
            </div>
          </div>

          {/* Right: Key Assumptions */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Key Assumptions</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-1">2030 Revenue Projection</div>
                <div className="text-3xl font-bold text-gray-900">$608M</div>
                <div className="text-xs text-gray-600 mt-1">From financial model</div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-3">Peer Group Multiples (EV/Revenue)</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lidar Companies:</span>
                    <span className="font-bold text-amber-600">9.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI/Computer Vision:</span>
                    <span className="font-bold text-emerald-600">7.6x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Silicon Photonics:</span>
                    <span className="font-bold text-purple-600">5.8x</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-2">Valuation Range</div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Conservative (5.8x):</span>
                  <span className="font-bold text-gray-900">$3.51B</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Mid-point (7.6x):</span>
                  <span className="font-bold text-gray-900">$4.61B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Optimistic (9.0x):</span>
                  <span className="font-bold text-gray-900">$5.47B</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Comparison Table */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Multiple Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm font-semibold">
                  <th className="p-3 text-left rounded-tl-lg">Scenario</th>
                  <th className="p-3 text-center">Multiple</th>
                  <th className="p-3 text-center">2030 Revenue</th>
                  <th className="p-3 text-center">Implied EV</th>
                  <th className="p-3 text-center rounded-tr-lg">Upside vs. Current</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="p-3 font-semibold text-gray-800">Current DCF Valuation</td>
                  <td className="p-3 text-center font-bold text-blue-600">1.3x</td>
                  <td className="p-3 text-center text-gray-700">$608M</td>
                  <td className="p-3 text-center font-bold text-blue-600">$776M</td>
                  <td className="p-3 text-center text-gray-500">—</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-purple-50">
                  <td className="p-3 font-semibold text-gray-800">Silicon Photonics Multiple</td>
                  <td className="p-3 text-center font-bold text-purple-600">5.8x</td>
                  <td className="p-3 text-center text-gray-700">$608M</td>
                  <td className="p-3 text-center font-bold text-purple-600">$3.51B</td>
                  <td className="p-3 text-center font-bold text-emerald-600">+352%</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-emerald-50">
                  <td className="p-3 font-semibold text-gray-800">AI/Computer Vision Multiple</td>
                  <td className="p-3 text-center font-bold text-emerald-600">7.6x</td>
                  <td className="p-3 text-center text-gray-700">$608M</td>
                  <td className="p-3 text-center font-bold text-emerald-600">$4.61B</td>
                  <td className="p-3 text-center font-bold text-emerald-600">+494%</td>
                </tr>
                <tr className="hover:bg-amber-50">
                  <td className="p-3 font-semibold text-gray-800">Lidar Companies Multiple</td>
                  <td className="p-3 text-center font-bold text-amber-600">9.0x</td>
                  <td className="p-3 text-center text-gray-700">$608M</td>
                  <td className="p-3 text-center font-bold text-amber-600">$5.47B</td>
                  <td className="p-3 text-center font-bold text-emerald-600">+605%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Investment Thesis</h3>
          <p className="text-gray-700 leading-relaxed">
            This analysis demonstrates that Voyant's current DCF valuation of <span className="font-bold text-blue-600">$776M</span> 
            (1.3x revenue) is <span className="font-bold">significantly below industry standards</span>. Comparable companies 
            across Lidar, AI/Computer Vision, and Silicon Photonics sectors trade at <span className="font-bold text-emerald-600">5.8-9.0x revenue multiples</span>. 
            As Voyant executes its growth strategy and achieves the projected <span className="font-bold">$608M revenue by 2030</span>, 
            the company should command similar multiples, implying a valuation range of 
            <span className="font-bold text-purple-600"> $3.5B - $5.5B</span> and representing 
            <span className="font-bold text-amber-600"> 4.5x - 7.0x return potential</span> for investors.
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 pt-4 border-t border-gray-200 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded shadow-sm"></div>
            <span className="text-xs font-semibold text-gray-700">Current DCF (1.3x)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-500 rounded shadow-sm"></div>
            <span className="text-xs font-semibold text-gray-700">Silicon Photonics (5.8x)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded shadow-sm"></div>
            <span className="text-xs font-semibold text-gray-700">AI/Vision (7.6x)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-500 rounded shadow-sm"></div>
            <span className="text-xs font-semibold text-gray-700">Lidar (9.0x)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoyantPeerMultipleValuation;