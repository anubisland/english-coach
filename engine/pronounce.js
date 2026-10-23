/* تقييم النطق: مقارنة كلمات الجملة النموذجية بما سمعناه. */

export function lev(a,b){const m=a.length,n=b.length,d=[];for(let i=0;i<=m;i++)d[i]=[i];for(let j=0;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
export function pronScore(target,heard){const T=words(target),H=words(heard);const miss=[],near=[];let ok=0;T.forEach(w=>{if(H.includes(w))ok++;else if(H.some(h=>lev(h,w)<=2))near.push(w);else miss.push(w)});const sc=Math.round(ok/T.length*100);const tips=[];if(T.some(w=>w.includes('th')))tips.push('الصوت th: ضع طرف لسانك بين أسنانك وانفخ بهدوء');if(T.some(w=>w.includes('v')))tips.push('الصوت v: ضع أسنانك العليا على شفتك السفلى');if(T.some(w=>w.includes('r')))tips.push('الصوت r: ارفع طرف لسانك قليلاً دون أن تلمس الحلق');return {sc,miss,near,tips,heard}}

export function words(s){return s.toLowerCase().replace(/[^\w\s]/g,'').split(/\s+/).filter(Boolean)}
