import { Stats } from "../libs/Stats";
export function initStats(type?: any) {
  const panelType =
    typeof type !== "undefined" && type && !isNaN(type) ? parseInt(type) : 0;
  const stats = Stats();
  stats.showPanel(panelType);
  document.body.appendChild(stats.dom);
  return stats;
}
