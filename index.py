import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load the comparable companies data
comp_analysis_df = pd.read_csv('Voyant LRP Model 9.24.25.xlsx - Comp_Analysis.csv', header=7)

# Clean the data
comp_analysis_df.dropna(how='all', inplace=True)
comp_analysis_df = comp_analysis_df[~comp_analysis_df['Company'].str.contains('GROUP', na=False)]
comp_analysis_df = comp_analysis_df[~comp_analysis_df['Company'].str.contains('Company', na=False)]
comp_analysis_df = comp_analysis_df.rename(columns={'Unnamed: 1': 'Company'})
comp_analysis_df = comp_analysis_df[['Company', 'EV/Revenue NTM']]

# Assign groups
groups = ['Lidar Companies', 'Semiconductor/Photonics', 'AI/Compute']
group_indices = comp_analysis_df[comp_analysis_df['Company'].isin(['Luminar Technologies', 'Broadcom', 'NVIDIA'])].index
group_map = {
    group_indices[0]: groups[0],
    group_indices[1]: groups[1],
    group_indices[2]: groups[2],
}

def get_group(index):
    if index >= group_indices[2]:
        return groups[2]
    if index >= group_indices[1]:
        return groups[1]
    if index >= group_indices[0]:
        return groups[0]
    return None

comp_analysis_df['Group'] = comp_analysis_df.index.map(get_group)
comp_analysis_df.dropna(subset=['Company'], inplace=True)
comp_analysis_df = comp_analysis_df[~comp_analysis_df['Company'].str.contains('Median', na=False)]

# Convert to numeric
comp_analysis_df['EV/Revenue NTM'] = pd.to_numeric(comp_analysis_df['EV/Revenue NTM'])
median_multiples = comp_analysis_df.groupby('Group')['EV/Revenue NTM'].median().reset_index()

# Get Voyant's data
dcf_analysis_df = pd.read_csv('Voyant LRP Model 9.24.25.xlsx - DCF Analysis.csv')
voyant_ev = dcf_analysis_df.iloc[6, 8]

tables_df = pd.read_csv('Voyant LRP Model 9.24.25.xlsx - Tables.csv', header=5)
tables_df.columns = ['Metric', '2025', '2026', '2027', '2028', '2029', '2030']
voyant_revenue_2027 = tables_df[tables_df['Metric'] == 'Total Revenue']['2027'].iloc[0] * 1000

voyant_multiple = voyant_ev / voyant_revenue_2027

# Create the first chart - Valuation Multiples
plt.style.use('seaborn-v0_8-darkgrid')
fig, ax = plt.subplots(figsize=(10, 6))

# Data for plotting
plot_data = median_multiples.copy()
plot_data.loc[3] = ['Voyant Photonics (EV/2027 Revenue)', voyant_multiple]
plot_data = plot_data.sort_values(by='EV/Revenue NTM', ascending=False)


colors = ['#1f77b4' if x != 'Voyant Photonics (EV/2027 Revenue)' else '#ff7f0e' for x in plot_data['Group']]

bars = ax.bar(plot_data['Group'], plot_data['EV/Revenue NTM'], color=colors)

ax.set_title('Voyant\'s Forward Revenue Multiple is Attractively Positioned vs. Peers', fontsize=16, fontweight='bold')
ax.set_ylabel('EV / Revenue Multiple', fontsize=12)
ax.set_xticklabels(plot_data['Group'], rotation=45, ha='right')

for bar in bars:
    yval = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2.0, yval + 0.2, f'{yval:.1f}x', ha='center', va='bottom', fontsize=11)

plt.tight_layout()
plt.savefig('voyant_valuation_multiples.png')

# Create the second chart - Market Opportunity
# Market Data from Lidar_Research_CL.md
market_size_2025 = 3.27  # in billions
cagr = 0.313
years = np.arange(2025, 2031)
market_size = market_size_2025 * (1 + cagr) ** (years - 2025)

# Voyant Revenue Data from Tables.csv
voyant_revenue_row = tables_df[tables_df['Metric'] == 'Total Revenue']
voyant_revenues = voyant_revenue_row.iloc[0, 1:7].astype(float) * 1000 / 1e9  # in billions

fig2, ax2 = plt.subplots(figsize=(12, 7))

# Plotting the market size as an area chart
ax2.fill_between(years, market_size, color="skyblue", alpha=0.4, label='Global LiDAR Market Size ($B)')
ax2.plot(years, market_size, color="Slateblue", alpha=0.6, linewidth=2)

ax2.set_title('Voyant is Positioned to Capture a Significant Share of a Rapidly Growing Market', fontsize=16, fontweight='bold')
ax2.set_ylabel('Market Size ($B)', fontsize=12)
ax2.tick_params(axis='y')

# Creating a secondary y-axis for Voyant's revenue
ax3 = ax2.twinx()
ax3.plot(years, voyant_revenues, color='darkorange', marker='o', linestyle='-', linewidth=2.5, markersize=8, label='Voyant Revenue ($B)')
ax3.set_ylabel('Voyant Revenue ($B)', color='darkorange', fontsize=12)
ax3.tick_params(axis='y', labelcolor='darkorange')

# Adding labels for market size
for i, (year, size) in enumerate(zip(years, market_size)):
    if i % 2 == 0:
      ax2.text(year, size - 1.5, f'${size:.1f}B', ha='center', color='midnightblue', fontsize=10)

# Combine legends
lines, labels = ax2.get_legend_handles_labels()
lines2, labels2 = ax3.get_legend_handles_labels()
ax3.legend(lines + lines2, labels + labels2, loc='upper left')

plt.tight_layout()
plt.savefig('voyant_market_opportunity.png')
