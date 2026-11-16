// Live market cap from DexScreener, refreshes every 20 seconds
(function(){
  const el=document.getElementById("mcap");
  if(!el||typeof CA==="undefined"||!CA) return;
  const fmt=v=>"$"+(v>=1e9?(v/1e9).toFixed(2)+"B":v>=1e6?(v/1e6).toFixed(2)+"M":v>=1e3?(v/1e3).toFixed(1)+"K":Math.round(v));
  async function run(){
    try{
      const r=await fetch("https://api.dexscreener.com/latest/dex/tokens/"+CA), j=await r.json();
      const p=(j.pairs||[]).sort((a,b)=>(b.liquidity?.usd||0)-(a.liquidity?.usd||0))[0];
      const v=p&&(p.marketCap||p.fdv);
      if(v) el.textContent=fmt(v);
    }catch(e){}
  }
  el.textContent="Loading"; run(); setInterval(run,20000);
})();
