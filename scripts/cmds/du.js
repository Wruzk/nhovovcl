const caigiaphaitra = 10000;
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "dú",
  version: "1.0.0",
  aliases: ["ngực", "zu"],
  role: 0,
  author: "Hùng",
  info: "Random ảnh dú",
  Category: "Giải trí",
  guides: "",
  cd: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.onCall = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  var link = [
  "https://files.catbox.moe/hvhk69.jpeg",
  "https://files.catbox.moe/9fdxsb.jpeg",
  "https://files.catbox.moe/l9hh9s.jpeg",
  "https://files.catbox.moe/y3obif.jpeg",
  "https://files.catbox.moe/lw33mx.jpeg",
  "https://files.catbox.moe/954qq3.jpeg",
  "https://files.catbox.moe/1v7703.jpeg",
  "https://files.catbox.moe/l1hbxe.jpeg",
  "https://files.catbox.moe/3zo6zq.jpeg",
  "https://files.catbox.moe/aut46w.jpeg",
  "https://files.catbox.moe/r5al4i.jpeg",
  "https://files.catbox.moe/6ozr04.jpeg",
  "https://files.catbox.moe/tubsqg.jpeg",
  "https://files.catbox.moe/d0j675.jpeg",
  "https://files.catbox.moe/5nsb83.jpeg",
  "https://files.catbox.moe/xig026.jpeg",
  "https://files.catbox.moe/yajuq5.jpeg",
  "https://files.catbox.moe/g1dd9i.jpeg",
  "https://files.catbox.moe/8zcycv.jpeg",
  "https://files.catbox.moe/1l564v.jpeg",
  "https://files.catbox.moe/w7bqvy.jpeg",
  "https://files.catbox.moe/rgscpt.jpeg",
  "https://files.catbox.moe/05mp98.jpeg",
  "https://files.catbox.moe/x0fxyi.jpeg",
  "https://files.catbox.moe/hjifzj.jpeg",
  "https://files.catbox.moe/io9lgy.jpeg",
  "https://files.catbox.moe/fx7gjd.jpeg",
  "https://files.catbox.moe/aqefri.jpeg",
  "https://files.catbox.moe/quewsx.jpeg",
  "https://files.catbox.moe/qi0bzn.jpeg",
  "https://files.catbox.moe/jic5t1.jpeg",
  "https://files.catbox.moe/6iz94v.jpeg",
  "https://files.catbox.moe/tepmvu.jpeg",
  "https://files.catbox.moe/tmdf7p.jpeg",
  "https://files.catbox.moe/xuhxa6.jpeg",
  "https://files.catbox.moe/3hcjyv.jpeg",
  "https://files.catbox.moe/8wdu97.jpeg",
  "https://files.catbox.moe/665lpf.jpeg",
  "https://files.catbox.moe/cb51ao.jpeg",
  "https://files.catbox.moe/r008o6.jpeg",
  "https://files.catbox.moe/2gv55e.jpeg",
  "https://files.catbox.moe/5if1q4.jpeg",
  "https://files.catbox.moe/ysrcuq.jpeg",
  "https://files.catbox.moe/trcx7a.jpeg",
  "https://files.catbox.moe/jk0bhc.jpeg",
  "https://files.catbox.moe/pget9g.jpeg",
  "https://files.catbox.moe/h7ejjl.jpeg",
  "https://files.catbox.moe/va7j4u.jpeg",
  "https://files.catbox.moe/95cdng.jpeg",
  "https://files.catbox.moe/nffuo3.jpeg",
  "https://files.catbox.moe/he6xxp.jpeg",
  "https://files.catbox.moe/l7tajd.jpeg",
  "https://files.catbox.moe/2zd3gt.jpeg",
  "https://files.catbox.moe/x564yu.jpeg",
  "https://files.catbox.moe/ccva7g.jpeg",
  "https://files.catbox.moe/2aao88.jpeg",
  "https://files.catbox.moe/6gw5wb.jpeg",
  "https://files.catbox.moe/g96g6e.jpeg",
  "https://files.catbox.moe/tiljxz.jpeg",
  "https://files.catbox.moe/yvkokx.jpeg",
  "https://files.catbox.moe/mbg8e1.jpeg",
  "https://files.catbox.moe/xqhwuh.jpeg",
  "https://files.catbox.moe/agjbb6.jpeg",
  "https://files.catbox.moe/bovw2f.jpeg",
  "https://files.catbox.moe/9t4nz8.jpeg",
  "https://files.catbox.moe/r4zswe.jpeg",
  "https://files.catbox.moe/omzdsb.jpeg",
  "https://files.catbox.moe/u1ss4n.jpeg",
  "https://files.catbox.moe/cfn71g.jpeg",
  "https://files.catbox.moe/0l7u7s.jpeg",
  "https://files.catbox.moe/axin35.jpeg",
  "https://files.catbox.moe/p8v21b.jpeg",
  "https://files.catbox.moe/ir09dw.jpeg",
  "https://files.catbox.moe/576ckh.jpeg",
  "https://files.catbox.moe/5g1biq.jpeg",
  "https://files.catbox.moe/8d0rje.jpeg",
  "https://files.catbox.moe/cqmre5.jpeg",
  "https://files.catbox.moe/owev07.jpeg",
  "https://files.catbox.moe/r00ny1.jpeg",
  "https://files.catbox.moe/rnuk9w.jpeg",
  "https://files.catbox.moe/a2mz6z.jpeg",
  "https://files.catbox.moe/utn1qw.jpeg",
  "https://files.catbox.moe/oktvvn.jpeg",
  "https://files.catbox.moe/huu6nd.jpeg",
  "https://files.catbox.moe/1me48c.jpeg",
  "https://files.catbox.moe/lhpc0p.jpeg",
  "https://files.catbox.moe/lxdkws.jpeg",
  "https://files.catbox.moe/gsmdsc.jpeg",
  "https://files.catbox.moe/76lnq4.jpeg",
  "https://files.catbox.moe/j4l1x6.jpeg",
  "https://files.catbox.moe/urxkfw.jpeg",
  "https://files.catbox.moe/c0qotk.jpeg",
  "https://files.catbox.moe/92cirq.jpeg",
  "https://files.catbox.moe/ybuani.jpeg",
  "https://files.catbox.moe/g5fpk8.jpeg",
  "https://files.catbox.moe/fgcwn3.jpeg",
  "https://files.catbox.moe/guozb0.jpeg",
  "https://files.catbox.moe/eoybuf.jpeg",
  "https://files.catbox.moe/jdjzfl.jpeg",
  "https://files.catbox.moe/6j8m4b.jpeg",
  "https://files.catbox.moe/p5307q.jpeg",
  "https://files.catbox.moe/drxi68.jpeg",
  "https://files.catbox.moe/kghlx9.jpeg",
  "https://files.catbox.moe/48nbhv.jpeg",
  "https://files.catbox.moe/9xmea6.jpeg",
  "https://files.catbox.moe/pirmfo.jpeg",
  "https://files.catbox.moe/iebe13.jpeg",
  "https://files.catbox.moe/a2kxl0.jpeg",
  "https://files.catbox.moe/nkiiq5.jpeg",
  "https://files.catbox.moe/lnqu77.jpeg",
  "https://files.catbox.moe/tgsve0.jpeg",
  "https://files.catbox.moe/boiaqi.jpeg",
  "https://files.catbox.moe/2sum92.jpeg",
  "https://files.catbox.moe/10thkf.jpeg",
  "https://files.catbox.moe/qgixgr.jpeg",
  "https://files.catbox.moe/qalkzg.jpeg",
  "https://files.catbox.moe/n518tj.jpeg",
  "https://files.catbox.moe/4smeb0.jpeg",
  "https://files.catbox.moe/od9hm4.jpeg",
  "https://files.catbox.moe/rwzybz.jpeg",
  "https://files.catbox.moe/7yfr6e.jpeg",
  "https://files.catbox.moe/489ork.jpeg",
  "https://files.catbox.moe/vx39bd.jpeg",
  "https://files.catbox.moe/dhb148.jpeg",
  "https://files.catbox.moe/i9ikyq.jpeg",
  "https://files.catbox.moe/wk37w8.jpeg",
  "https://files.catbox.moe/r5yasq.jpeg",
  "https://files.catbox.moe/fgcwn3.jpeg",
  "https://files.catbox.moe/zpdqdv.jpeg",
  "https://files.catbox.moe/5xra84.jpeg",
  "https://files.catbox.moe/0clveo.jpeg",
  "https://files.catbox.moe/teuuuc.jpeg",
  "https://files.catbox.moe/m9u4sd.jpeg",
  "https://files.catbox.moe/8nuvbz.jpeg",
  "https://files.catbox.moe/fevkdt.jpeg",
  "https://files.catbox.moe/qp2a8a.jpeg",
  "https://files.catbox.moe/b3kyxt.jpeg",
  "https://files.catbox.moe/l4uy26.jpeg",
  "https://files.catbox.moe/figqxm.jpeg",
  "https://files.catbox.moe/67auly.jpeg",
  "https://files.catbox.moe/jj65io.jpeg",
  "https://files.catbox.moe/36ubyg.jpeg",
  "https://files.catbox.moe/013lfw.jpeg",
  "https://files.catbox.moe/x6uu5b.jpeg",
  "https://files.catbox.moe/94b28x.jpeg",
  "https://files.catbox.moe/uosgff.jpeg",
  "https://files.catbox.moe/l3szoq.jpeg",
  "https://files.catbox.moe/p5f5pg.jpeg",
  "https://files.catbox.moe/3pem3t.jpeg",
  "https://files.catbox.moe/tah0l2.jpeg",
  "https://files.catbox.moe/wh368w.jpeg",
  "https://files.catbox.moe/v88beb.jpeg",
  "https://files.catbox.moe/0x38pq.jpeg",
  "https://files.catbox.moe/i78jmp.jpeg",
  "https://files.catbox.moe/vl6k10.jpeg",
  "https://files.catbox.moe/xswoao.jpeg",
  "https://files.catbox.moe/81psew.jpeg",
  "https://files.catbox.moe/9gz86l.jpeg",
  "https://files.catbox.moe/touhys.jpeg",
  "https://files.catbox.moe/touhys.jpeg",
  "https://files.catbox.moe/l2vghd.jpeg",
  "https://files.catbox.moe/r6z9lo.jpeg",
  "https://files.catbox.moe/lmf3v6.jpeg",
  "https://files.catbox.moe/sef10q.jpeg",
  "https://files.catbox.moe/2m2r3o.jpeg",
  "https://files.catbox.moe/mj30z5.jpeg",
  "https://files.catbox.moe/q9akgt.jpeg",
  "https://files.catbox.moe/ehomu6.jpeg",
  "https://files.catbox.moe/fvllm6.jpeg",
  "https://files.catbox.moe/t7fzm9.jpeg",
  "https://files.catbox.moe/8qe9ws.jpeg",
  "https://files.catbox.moe/aw17ba.jpeg",
  "https://files.catbox.moe/91tpx7.jpeg",
  "https://files.catbox.moe/9w0zkv.jpeg",
  "https://files.catbox.moe/0jhx4e.jpeg",
  "https://files.catbox.moe/y83ws6.jpeg",
  "https://files.catbox.moe/cmad7y.jpeg",
  "https://files.catbox.moe/fqqlpc.jpeg",
  "https://files.catbox.moe/78i2ny.jpeg",
  "https://files.catbox.moe/og5m0w.jpeg",
  "https://files.catbox.moe/mutao4.jpeg",
  "https://files.catbox.moe/odcejl.jpeg",
  "https://files.catbox.moe/pv281m.jpeg",
  "https://files.catbox.moe/dnzfao.jpeg",
  "https://files.catbox.moe/ja4vt3.jpeg",
  "https://files.catbox.moe/5h8q67.jpeg",
  "https://files.catbox.moe/3ysdhc.jpeg",
  "https://files.catbox.moe/izp9ro.jpeg",
  "https://files.catbox.moe/ds904d.jpeg",
  "https://files.catbox.moe/z9641u.jpeg",
  "https://files.catbox.moe/md2ikg.jpeg",
  "https://files.catbox.moe/kc46go.jpeg",
  "https://files.catbox.moe/g5ydjg.jpeg",
  "https://files.catbox.moe/yjb76q.jpeg",
  "https://files.catbox.moe/2mcf6k.jpeg",
  "https://files.catbox.moe/8k5n7q.jpeg",
  "https://files.catbox.moe/og551k.jpeg",
  "https://files.catbox.moe/hn64rd.jpeg",
  "https://files.catbox.moe/b9xhbd.jpeg",
  "https://files.catbox.moe/uu2vyu.jpeg",
  "https://files.catbox.moe/1w1w4m.jpeg",
  "https://files.catbox.moe/skspga.jpeg",
  "https://files.catbox.moe/a2mz6z.jpeg",
  "https://files.catbox.moe/yx47n9.jpeg",
  "https://files.catbox.moe/n4zfyq.jpeg",
  "https://files.catbox.moe/u47pdh.jpeg",
  "https://files.catbox.moe/9fbdis.jpeg",
  "https://files.catbox.moe/vlg6fx.jpeg",
  "https://files.catbox.moe/p0txu8.jpeg",
  "https://files.catbox.moe/67224j.jpeg",
  "https://files.catbox.moe/arosuv.jpeg",
  "https://files.catbox.moe/e8ov6s.jpeg",
  "https://files.catbox.moe/9b4ahb.jpeg",
  "https://files.catbox.moe/rhe7jh.jpeg",
  "https://files.catbox.moe/lvy3tw.jpeg",
  "https://files.catbox.moe/rp05ns.jpeg",
  "https://files.catbox.moe/fudbfd.jpeg",
  "https://files.catbox.moe/hbrsw3.jpeg",
  "https://files.catbox.moe/bgniuw.jpeg",
  "https://files.catbox.moe/w7xa1o.jpeg",
  "https://files.catbox.moe/i78ppd.jpeg",
  "https://files.catbox.moe/rbu6ni.jpeg",
  "https://files.catbox.moe/c737si.jpeg",
  "https://files.catbox.moe/sjv7tm.jpeg",
  "https://files.catbox.moe/rrxzuq.jpeg",
  "https://files.catbox.moe/frsqwv.jpeg",
  "https://files.catbox.moe/rdggvg.jpeg",
  "https://files.catbox.moe/0eq7j9.jpeg",
  "https://files.catbox.moe/u0265h.jpeg",
  "https://files.catbox.moe/ohcqkg.jpeg",
  "https://files.catbox.moe/i4smu2.jpeg",
  "https://files.catbox.moe/qtch7o.jpeg",
  "https://files.catbox.moe/vrz9xu.jpeg",
  "https://files.catbox.moe/j6g06z.jpeg",
  "https://files.catbox.moe/uobjz7.jpeg",
  "https://files.catbox.moe/8vxqwe.jpeg",
  "https://files.catbox.moe/05owcc.jpeg",
  "https://files.catbox.moe/51mum9.jpeg",
  "https://files.catbox.moe/cwpqr6.jpeg",
  "https://files.catbox.moe/92fucg.jpeg",
  "https://files.catbox.moe/c4c3hx.jpeg",
  "https://files.catbox.moe/62ihs5.jpeg",
  "https://files.catbox.moe/nbcqc5.jpeg",
  "https://files.catbox.moe/96d42a.jpeg",
  "https://files.catbox.moe/bu9qlq.jpeg",
  "https://files.catbox.moe/sk5y26.jpeg",
  "https://files.catbox.moe/vnhl93.jpeg",
  "https://files.catbox.moe/bdw0ra.jpeg",
  "https://files.catbox.moe/2uvjwk.jpeg",
  "https://files.catbox.moe/vcybz5.jpeg",
  "https://files.catbox.moe/qsjb5s.jpeg",
  "https://files.catbox.moe/3p41hi.jpeg",
  "https://files.catbox.moe/706gs0.jpeg",
  "https://files.catbox.moe/aihc4i.jpeg",
  "https://files.catbox.moe/1e38ny.jpeg",
  "https://files.catbox.moe/gcygsm.jpeg",
  "https://files.catbox.moe/q1xg4g.jpeg",
  "https://files.catbox.moe/lerfxf.jpeg",
  "https://files.catbox.moe/5hgt1x.jpeg",
  "https://files.catbox.moe/kboyum.jpeg",
  "https://files.catbox.moe/1q6jta.jpeg",
  "https://files.catbox.moe/w9smf3.jpeg",
  "https://files.catbox.moe/vqqe23.jpeg",
  "https://files.catbox.moe/wo6f3p.jpeg",
  "https://files.catbox.moe/b95w74.jpeg",
  "https://files.catbox.moe/7yz0ll.jpeg",
  "https://files.catbox.moe/sdu6y8.jpeg",
  "https://files.catbox.moe/0648gm.jpeg",
  "https://files.catbox.moe/jxjkw2.jpeg",
  "https://files.catbox.moe/iqs21i.jpeg",
  "https://files.catbox.moe/oo55q2.jpeg",
  "https://files.catbox.moe/rc52rt.jpeg",
  "https://files.catbox.moe/uvtycf.jpeg",
  "https://files.catbox.moe/7rufj3.jpeg",
  "https://files.catbox.moe/vmdslg.jpeg",
  "https://files.catbox.moe/9k60r0.jpeg",
  "https://files.catbox.moe/2c8uk7.jpeg",
  "https://files.catbox.moe/477nzz.jpeg",
  "https://files.catbox.moe/0bxou1.jpeg",
  "https://files.catbox.moe/jraxpa.jpeg",
  "https://files.catbox.moe/b33cpu.jpeg",
  "https://files.catbox.moe/qja0y7.jpeg",
  "https://files.catbox.moe/lsn1vx.jpeg",
  "https://files.catbox.moe/ptzbbt.jpeg",
  "https://files.catbox.moe/rbxgy6.jpeg",
  "https://files.catbox.moe/0knxvj.jpeg",
  "https://files.catbox.moe/xe3i2m.jpeg",
  "https://files.catbox.moe/i78208.jpeg",
  "https://files.catbox.moe/tu3ihm.jpeg",
  "https://files.catbox.moe/q470ki.jpeg",
  "https://files.catbox.moe/tm17y2.jpeg",
  "https://files.catbox.moe/nc7gef.jpeg",
  "https://files.catbox.moe/dsv7h2.jpeg",
  "https://files.catbox.moe/12nu7f.jpeg",
  "https://files.catbox.moe/gj1y38.jpeg",
  "https://files.catbox.moe/uexwx3.jpeg",
  "https://files.catbox.moe/v7m06g.jpeg",
  "https://files.catbox.moe/kd3lx5.jpeg",
  "https://files.catbox.moe/a5mxc2.jpeg",
  "https://files.catbox.moe/meb41i.jpeg",
  "https://files.catbox.moe/2lrim9.jpeg",
  "https://files.catbox.moe/5qqm0h.jpeg",
  "https://files.catbox.moe/2kxty1.jpeg",
  "https://files.catbox.moe/7opsjm.jpeg",
  "https://files.catbox.moe/f0d8em.jpeg",
  "https://files.catbox.moe/p8s0sr.jpeg",
  "https://files.catbox.moe/bjwm4r.jpeg",
  "https://files.catbox.moe/5oiu6y.jpeg",
  "https://files.catbox.moe/y35xv6.jpeg",
  "https://files.catbox.moe/kcaa9a.jpeg",
  "https://files.catbox.moe/w87bpq.jpeg",
  "https://files.catbox.moe/s51moo.jpeg",
  "https://files.catbox.moe/ygk426.jpeg",
  "https://files.catbox.moe/n191g7.jpeg",
  "https://files.catbox.moe/gz2yac.jpeg",
  "https://files.catbox.moe/gpmy86.jpeg",
  "https://files.catbox.moe/1u7ax1.jpeg",
  "https://files.catbox.moe/d0ockk.jpeg",
  "https://files.catbox.moe/19pgtu.jpeg",
  "https://files.catbox.moe/zw64fl.jpeg",
  "https://files.catbox.moe/o71w94.jpeg",
  "https://files.catbox.moe/rzurfr.jpeg",
  "https://files.catbox.moe/ei0uqk.jpeg",
  "https://files.catbox.moe/7us231.jpeg",
  "https://files.catbox.moe/maabv3.jpeg",
  "https://files.catbox.moe/918u4c.jpeg",
  "https://files.catbox.moe/p1ytg6.jpeg",
  "https://files.catbox.moe/7u67r2.jpeg",
  "https://files.catbox.moe/3up4ba.jpeg",
  "https://files.catbox.moe/5dgg3z.jpeg",
  "https://files.catbox.moe/a2kxl0.jpeg",
  "https://files.catbox.moe/hc5fm0.jpeg",
  "https://files.catbox.moe/3ppfbr.jpeg",
  "https://files.catbox.moe/y1198q.jpeg",
  "https://files.catbox.moe/q3na56.jpeg",
  "https://files.catbox.moe/hf4vq9.jpeg",
  "https://files.catbox.moe/l0bz1l.jpeg",
  "https://files.catbox.moe/94nj1l.jpeg",
  "https://files.catbox.moe/r6qepp.jpeg",
  "https://files.catbox.moe/w3b79k.jpeg",
  "https://files.catbox.moe/1v5f0m.jpeg",
  "https://files.catbox.moe/tdb295.jpeg",
  "https://files.catbox.moe/40nhks.jpeg",
  "https://files.catbox.moe/49ek24.jpeg",
  "https://files.catbox.moe/vs9qux.jpeg",
  "https://files.catbox.moe/6n4v9x.jpeg",
  "https://files.catbox.moe/u4i8ot.jpeg",
  "https://files.catbox.moe/bmkksb.jpeg",
  "https://files.catbox.moe/yywlvp.jpeg",
  "https://files.catbox.moe/q99nzn.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/iwaj5b.jpeg",
  "https://files.catbox.moe/4qn25w.jpeg",
  "https://files.catbox.moe/9vlxpk.jpeg",
  "https://files.catbox.moe/2x74jl.jpeg",
  "https://files.catbox.moe/9oxq3b.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/37zdmg.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/qcx392.jpeg",
  "https://files.catbox.moe/f90o56.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/gmm0mw.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/7qhm0m.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/17zmk6.jpeg",
  "https://files.catbox.moe/9vl2qd.jpeg",
  "https://files.catbox.moe/o7527i.jpeg",
  "https://files.catbox.moe/0g86xb.jpeg",
  "https://files.catbox.moe/5eee4g.jpeg",
  "https://files.catbox.moe/nqnvoi.jpeg",
  "https://files.catbox.moe/zdv124.jpeg",
  "https://files.catbox.moe/9qos9s.jpeg",
  "https://files.catbox.moe/5lad6u.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/9svbv1.jpeg",
  "https://files.catbox.moe/46nffm.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/mj29qm.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/jkk6mo.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/fe9rch.jpeg",
  "https://files.catbox.moe/1e0zcz.jpeg",
  "https://files.catbox.moe/gelu75.jpeg",
  "https://files.catbox.moe/8ilwok.jpeg",
  "https://files.catbox.moe/fkri99.jpeg",
  "https://files.catbox.moe/07p2iz.jpeg",
  "https://files.catbox.moe/8i17ey.jpeg",
  "https://files.catbox.moe/o1hkze.jpeg",
  "https://files.catbox.moe/jup8ba.jpeg",
  "https://files.catbox.moe/y2w7m7.jpeg",
  "https://files.catbox.moe/kfg9q4.jpeg",
  "https://files.catbox.moe/uyfrwg.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/fvawoj.jpeg",
  "https://files.catbox.moe/zftui2.jpeg",
  "https://files.catbox.moe/wvxrbl.jpeg",
  "https://files.catbox.moe/hro9x4.jpeg",
  "https://files.catbox.moe/f3paoz.jpeg",
  "https://files.catbox.moe/7edr0s.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/zfg411.jpeg",
  "https://files.catbox.moe/6lpwyh.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/p0punc.jpeg",
  "https://files.catbox.moe/jylkwm.jpeg",
  "https://files.catbox.moe/47vwpg.jpeg",
  "https://files.catbox.moe/en63q7.jpeg",
  "https://files.catbox.moe/t6zlto.jpeg",
  "https://files.catbox.moe/gnpk3u.jpeg",
  "https://files.catbox.moe/9lfz3o.jpeg",
  "https://files.catbox.moe/3dmjk5.jpeg",
  "https://files.catbox.moe/g98y10.jpeg",
  "https://files.catbox.moe/0940a5.jpeg",
  "https://files.catbox.moe/a3xsfu.jpeg",
  "https://files.catbox.moe/mpq21b.jpeg",
  "https://files.catbox.moe/gv5h7i.jpeg",
  "https://files.catbox.moe/fk0fim.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/n9f97m.jpeg",
  "https://files.catbox.moe/0940a5.jpeg",
  "https://files.catbox.moe/q702cn.jpeg",
  "https://files.catbox.moe/k58ht8.jpeg",
  "https://files.catbox.moe/bv94w1.jpeg",
  "https://files.catbox.moe/baoy1f.jpeg",
  "https://files.catbox.moe/6o8xlh.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/wrycp4.jpeg",
  "https://files.catbox.moe/wxu8lb.jpeg",
  "https://files.catbox.moe/o0tn0v.jpeg",
  "https://files.catbox.moe/nk08pg.jpeg",
  "https://files.catbox.moe/yukdd2.jpeg",
  "https://files.catbox.moe/n32aet.jpeg",
  "https://files.catbox.moe/nlzs8u.jpeg",
  "https://files.catbox.moe/0oln6b.jpeg",
  "https://files.catbox.moe/7ay8b8.jpeg",
  "https://files.catbox.moe/712nno.jpeg",
  "https://files.catbox.moe/p1to97.jpeg",
  "https://files.catbox.moe/gscr8i.jpeg",
  "https://files.catbox.moe/f101ed.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/ajat04.jpeg",
  "https://files.catbox.moe/l92gxq.jpeg",
  "https://files.catbox.moe/e42nd2.jpeg",
  "https://files.catbox.moe/1e1fn4.jpeg",
  "https://files.catbox.moe/s0q6cm.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/82hjkh.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/7iamgn.jpeg",
  "https://files.catbox.moe/21ur3p.jpeg",
  "https://files.catbox.moe/mjyzdh.jpeg",
  "https://files.catbox.moe/nky5x3.jpeg",
  "https://files.catbox.moe/b8bnua.jpeg",
  "https://files.catbox.moe/v9g8ya.jpeg",
  "https://files.catbox.moe/wu28ba.jpeg",
  "https://files.catbox.moe/9qf7wj.jpeg",
  "https://files.catbox.moe/fae9rt.jpeg",
  "https://files.catbox.moe/es9n96.jpeg",
  "https://files.catbox.moe/x5q4zg.png",
  "https://files.catbox.moe/fut92k.jpeg",
  "https://files.catbox.moe/bpqw28.jpeg",
  "https://files.catbox.moe/4m3ue8.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/fctkl9.jpeg",
  "https://files.catbox.moe/h1k7lv.jpeg",
  "https://files.catbox.moe/g1kzfz.jpeg",
  "https://files.catbox.moe/nxosx4.jpeg",
  "https://files.catbox.moe/d2x1qj.jpeg",
  "https://files.catbox.moe/1q313a.jpeg",
  "https://files.catbox.moe/xyihsn.jpeg",
  "https://files.catbox.moe/rvae8r.jpeg",
  "https://files.catbox.moe/4ickom.jpeg",
  "https://files.catbox.moe/5a0lw1.jpeg",
  "https://files.catbox.moe/8v7km6.jpeg",
  "https://files.catbox.moe/kbydbm.jpeg",
  "https://files.catbox.moe/omqaju.jpeg",
  "https://files.catbox.moe/wznux8.jpeg",
  "https://files.catbox.moe/le9m8f.jpeg",
  "https://files.catbox.moe/ybr51g.jpeg",
  "https://files.catbox.moe/cit0a6.jpeg",
  "https://files.catbox.moe/lqthm6.jpeg",
  "https://files.catbox.moe/rpc9bv.jpeg",
  "https://files.catbox.moe/gjmhdu.jpeg",
  "https://files.catbox.moe/60il3o.jpeg",
  "https://files.catbox.moe/jkr940.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/ob7evq.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/oadsmu.jpeg",
  "https://files.catbox.moe/32l0pn.jpeg",
  "https://files.catbox.moe/h4ylkc.jpeg",
  "https://files.catbox.moe/xwb7a8.jpeg",
  "https://files.catbox.moe/6k89ve.jpeg",
  "https://files.catbox.moe/xmnbbv.jpeg",
  "https://files.catbox.moe/g7bcgf.jpeg",
  "https://files.catbox.moe/9ytd17.jpeg",
  "https://files.catbox.moe/obpu5x.jpeg",
  "https://files.catbox.moe/hsm488.jpeg",
  "https://files.catbox.moe/93gghv.jpeg",
  "https://files.catbox.moe/y8hsv9.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/vsgb8n.jpeg",
  "https://files.catbox.moe/sogekz.jpeg",
  "https://files.catbox.moe/pbazfs.jpeg",
  "https://files.catbox.moe/jfwzwp.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/oqb52m.jpeg",
  "https://files.catbox.moe/1mr10l.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/4ox7ww.jpeg",
  "https://files.catbox.moe/na1ty0.jpeg",
  "https://files.catbox.moe/izj8dc.jpeg",
  "https://files.catbox.moe/rz0n9p.jpeg",
  "https://files.catbox.moe/p25pn6.jpeg",
  "https://files.catbox.moe/etrkek.jpeg",
  "https://files.catbox.moe/kfdei9.jpeg",
  "https://files.catbox.moe/ncf9n5.jpeg",
  "https://files.catbox.moe/2d5trz.jpeg",
  "https://files.catbox.moe/7rujpk.jpeg",
  "https://files.catbox.moe/utq29o.jpeg",
  "https://files.catbox.moe/qwfvnd.jpeg",
  "https://files.catbox.moe/3stmyz.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/0cuwe6.jpeg",
  "https://files.catbox.moe/r6ymq2.jpeg",
  "https://files.catbox.moe/2l8svr.jpeg",
  "https://files.catbox.moe/e0j4oz.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/hgsd0p.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/2yzo4w.jpeg",
  "https://files.catbox.moe/79sqhm.jpeg",
  "https://files.catbox.moe/b77158.jpeg",
  "https://files.catbox.moe/4e9u3q.jpeg",
  "https://files.catbox.moe/q9akgt.jpeg",
  "https://files.catbox.moe/2x74jl.jpeg",
  "https://files.catbox.moe/sfwzmq.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/uegkpk.jpeg",
  "https://files.catbox.moe/3ju8xu.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/iwaj5b.jpeg",
  "https://files.catbox.moe/q99nzn.jpeg",
  "https://files.catbox.moe/qsl37l.jpeg",
  "https://files.catbox.moe/m4cii3.jpeg",
  "https://files.catbox.moe/gj4maq.jpeg",
  "https://files.catbox.moe/3h07tk.jpeg",
  "https://files.catbox.moe/4x04ha.jpeg",
  "https://files.catbox.moe/cv5hrt.jpeg",
  "https://files.catbox.moe/4qn25w.jpeg",
  "https://files.catbox.moe/et3mvt.jpeg",
  "https://files.catbox.moe/47riyu.jpeg",
  "https://files.catbox.moe/nw2673.jpeg",
  "https://files.catbox.moe/4wxnva.jpeg",
  "https://files.catbox.moe/pwwdzz.jpeg",
  "https://files.catbox.moe/edsbas.jpeg",
  "https://files.catbox.moe/wcgnrq.jpeg",
  "https://files.catbox.moe/dibcpw.jpeg",
  "https://files.catbox.moe/8r3ua9.jpeg",
  "https://files.catbox.moe/3exb8c.jpeg",
  "https://files.catbox.moe/vsl9k2.jpeg",
  "https://files.catbox.moe/43ca5h.jpeg",
  "https://files.catbox.moe/snkbd9.jpeg",
  "https://files.catbox.moe/9wjub1.jpeg",
  "https://files.catbox.moe/r7nz7g.jpeg",
  "https://files.catbox.moe/na72ng.jpeg",
  "https://files.catbox.moe/1w67bp.jpeg",
  "https://files.catbox.moe/yo093f.jpeg",
  "https://files.catbox.moe/unb4t0.jpeg",
  "https://files.catbox.moe/3o83mj.jpeg",
  "https://files.catbox.moe/voq546.jpeg",
  "https://files.catbox.moe/z2lu8m.jpeg",
  "https://files.catbox.moe/22tzvf.jpeg",
  "https://files.catbox.moe/danb16.jpeg",
  "https://files.catbox.moe/w817tr.jpeg",
  "https://files.catbox.moe/c75mbt.jpeg",
  "https://files.catbox.moe/04l3po.jpeg",
  "https://files.catbox.moe/jh4y1l.jpeg",
  "https://files.catbox.moe/0yl5jt.jpeg",
  "https://files.catbox.moe/8xk7s2.jpeg",
  "https://files.catbox.moe/qmwyh6.jpeg",
  "https://files.catbox.moe/8b0asz.jpeg",
  "https://files.catbox.moe/5fdgtv.jpeg",
  "https://files.catbox.moe/nf19rq.jpeg",
  "https://files.catbox.moe/lhel17.jpeg",
  "https://files.catbox.moe/6mli3e.jpeg",
  "https://files.catbox.moe/4rnb8r.jpeg",
  "https://files.catbox.moe/9yzltv.jpeg",
  "https://files.catbox.moe/ji2pb3.jpeg",
  "https://files.catbox.moe/fyvpvr.jpeg",
  "https://files.catbox.moe/qlr5gt.jpeg",
  "https://files.catbox.moe/ag4cya.jpeg",
  "https://files.catbox.moe/9imlzz.jpeg",
  "https://files.catbox.moe/htky7r.jpeg",
  "https://files.catbox.moe/aeocod.jpeg",
  "https://files.catbox.moe/4uh2kx.jpeg",
  "https://files.catbox.moe/kxb9rw.jpeg",
  "https://files.catbox.moe/c6iuee.jpeg",
  "https://files.catbox.moe/poxzxu.jpeg",
  "https://files.catbox.moe/10ipcd.jpeg",
  "https://files.catbox.moe/5gw2rh.jpeg",
  "https://files.catbox.moe/8qkt20.jpeg",
  "https://files.catbox.moe/0u4uf3.jpeg",
  "https://files.catbox.moe/as0df2.jpeg",
  "https://files.catbox.moe/txqs9i.jpeg",
  "https://files.catbox.moe/71qz0m.jpeg",
  "https://files.catbox.moe/13peul.jpeg",
  "https://files.catbox.moe/lwpp93.jpeg",
  "https://files.catbox.moe/2gud2x.jpeg",
  "https://files.catbox.moe/2nngh7.jpeg",
  "https://files.catbox.moe/x9ia0n.jpeg",
  "https://files.catbox.moe/9iroxf.jpeg",
  "https://files.catbox.moe/jnyjma.jpeg",
  "https://files.catbox.moe/l4oiwa.jpeg",
  "https://files.catbox.moe/eymz6m.jpeg",
  "https://files.catbox.moe/s2o966.jpeg",
  "https://files.catbox.moe/uurjwh.jpeg",
  "https://files.catbox.moe/5dw6gf.jpeg",
  "https://files.catbox.moe/8i81h1.jpeg",
  "https://files.catbox.moe/h0f8tj.jpeg",
  "https://files.catbox.moe/x14tsp.jpeg",
  "https://files.catbox.moe/lmgjog.jpeg",
  "https://files.catbox.moe/hx0hog.jpeg",
  "https://files.catbox.moe/o1l6jg.jpeg",
  "https://files.catbox.moe/kad3ea.jpeg",
  "https://files.catbox.moe/rb9r2j.jpeg",
  "https://files.catbox.moe/hzmbnh.jpeg",
  "https://files.catbox.moe/x9ia0n.jpeg",
  "https://files.catbox.moe/rje33f.jpeg",
  "https://files.catbox.moe/a0884n.jpeg",
  "https://files.catbox.moe/3bm35v.jpeg",
  "https://files.catbox.moe/lqeglz.jpeg",
  "https://files.catbox.moe/kjpqyx.jpeg",
  "https://files.catbox.moe/oz8727.jpeg",
  "https://files.catbox.moe/uvyytr.jpeg",
  "https://files.catbox.moe/inwk0d.jpeg",
  "https://files.catbox.moe/whtqxh.jpeg",
  "https://files.catbox.moe/ukazde.jpeg",
  "https://files.catbox.moe/kozjfz.jpeg",
  "https://files.catbox.moe/3ybmjh.jpeg",
  "https://files.catbox.moe/vcefg8.jpeg",
  "https://files.catbox.moe/8y87z2.jpeg",
  "https://files.catbox.moe/fbtk8y.jpeg",
  "https://files.catbox.moe/mdaxe6.jpeg",
  "https://files.catbox.moe/83qlxp.jpeg",
  "https://files.catbox.moe/9rrxyz.jpeg",
  "https://files.catbox.moe/rvfnd8.jpeg",
  "https://files.catbox.moe/3qh77b.jpeg",
  "https://files.catbox.moe/pr076p.jpeg",
  "https://files.catbox.moe/jfwryg.jpeg",
  "https://files.catbox.moe/hx4w9t.jpeg",
  "https://files.catbox.moe/4gzg28.jpeg",
  "https://files.catbox.moe/4szydn.jpeg",
  "https://files.catbox.moe/41a9hm.jpeg",
  "https://files.catbox.moe/e3gz2f.jpeg",
  "https://files.catbox.moe/g2wvwp.jpeg",
  "https://files.catbox.moe/l9p3af.jpeg",
  "https://files.catbox.moe/pe25hn.jpeg",
  "https://files.catbox.moe/bh2f9j.jpeg",
  "https://files.catbox.moe/xxydqo.jpeg",
  "https://files.catbox.moe/ekogrz.jpeg",
  "https://files.catbox.moe/lpl0ie.jpeg",
  "https://files.catbox.moe/0zp8qc.jpeg",
  "https://files.catbox.moe/eo77f0.jpeg",
  "https://files.catbox.moe/rjdb2l.jpeg",
  "https://files.catbox.moe/6ovvp4.jpeg",
  "https://files.catbox.moe/qlogl9.jpeg",
  "https://files.catbox.moe/re59iq.jpeg",
  "https://files.catbox.moe/tdpwxg.jpeg",
  "https://files.catbox.moe/uzv3bu.jpeg",
  "https://files.catbox.moe/fslkr0.jpeg",
  "https://files.catbox.moe/pbis1e.jpeg",
  "https://files.catbox.moe/oenwwt.jpeg",
  "https://files.catbox.moe/e3wkpn.jpeg",
  "https://files.catbox.moe/jzraix.jpeg",
  "https://files.catbox.moe/rihyrk.jpeg",
  "https://files.catbox.moe/noww2g.webp",
  "https://files.catbox.moe/ftmpbz.jpeg",
  "https://files.catbox.moe/y61c8y.jpeg",
  "https://files.catbox.moe/ninqfk.jpeg",
  "https://files.catbox.moe/lna74z.jpeg",
  "https://files.catbox.moe/42x8yk.jpeg",
  "https://files.catbox.moe/ogulvg.jpeg",
  "https://files.catbox.moe/88kqnt.jpeg",
  "https://files.catbox.moe/6bq1wf.jpeg",
  "https://files.catbox.moe/n4vbzy.jpeg",
  "https://files.catbox.moe/umwtlb.jpeg",
  "https://files.catbox.moe/jaikxe.jpeg",
  "https://files.catbox.moe/keaicq.jpeg",
  "https://files.catbox.moe/twmys8.jpeg",
  "https://files.catbox.moe/9dwzxc.jpeg",
  "https://files.catbox.moe/5me9bw.jpeg",
  "https://files.catbox.moe/9gplg6.jpeg",
  "https://files.catbox.moe/wwgtd8.jpeg",
  "https://files.catbox.moe/memlbh.jpeg",
  "https://files.catbox.moe/kogn3o.jpeg",
  "https://files.catbox.moe/2x5zj6.jpeg",
  "https://files.catbox.moe/paexm2.jpeg",
  "https://files.catbox.moe/8thgbj.jpeg",
  "https://files.catbox.moe/iws7ic.jpeg",
  "https://files.catbox.moe/gx0gbk.jpeg",
  "https://files.catbox.moe/7gftlm.jpeg",
  "https://files.catbox.moe/qe6drx.jpeg",
  "https://files.catbox.moe/8rj2om.jpeg",
  "https://files.catbox.moe/l8insk.jpeg",
  "https://files.catbox.moe/9xtsws.jpeg",
  "https://files.catbox.moe/o9jj6e.jpeg",
  "https://files.catbox.moe/nawzsl.jpeg",
  "https://files.catbox.moe/kt8u6p.jpeg",
  "https://files.catbox.moe/51fqqe.jpeg",
  "https://files.catbox.moe/pwh52a.jpeg",
  "https://files.catbox.moe/0bvlvg.jpeg",
  "https://files.catbox.moe/t92iij.jpeg",
  "https://files.catbox.moe/bc7qya.jpeg",
  "https://files.catbox.moe/wfye0l.jpeg",
  "https://files.catbox.moe/pqsqod.jpeg",
  "https://files.catbox.moe/29x2yz.jpeg",
  "https://files.catbox.moe/tp4zcc.jpeg",
  "https://files.catbox.moe/2o4whz.jpeg",
  "https://files.catbox.moe/hdl773.jpeg",
  "https://files.catbox.moe/bddlk2.jpeg",
  "https://files.catbox.moe/q6w68s.jpeg",
  "https://files.catbox.moe/7j4r92.jpeg",
  "https://files.catbox.moe/ie4ixn.jpeg",
  "https://files.catbox.moe/k8a7qj.jpeg",
  "https://files.catbox.moe/1gajdz.jpeg",
  "https://files.catbox.moe/qeee5q.jpeg",
  "https://files.catbox.moe/m4x165.jpeg",
  "https://files.catbox.moe/gi0je9.jpeg",
  "https://files.catbox.moe/pvb8tn.jpeg",
  "https://files.catbox.moe/mfkbvf.jpeg",
  "https://files.catbox.moe/2f49k6.jpeg",
  "https://files.catbox.moe/y66189.jpeg",
  "https://files.catbox.moe/4zn4v4.jpeg",
  "https://files.catbox.moe/6jva6j.jpeg",
  "https://files.catbox.moe/7z09yz.jpeg",
  "https://files.catbox.moe/frclst.jpeg",
  "https://files.catbox.moe/hnydvh.jpeg",
  "https://files.catbox.moe/462vas.jpeg",
  "https://files.catbox.moe/knribf.jpeg",
  "https://files.catbox.moe/3e4fqf.jpeg",
  "https://files.catbox.moe/j82x0x.jpeg",
  "https://files.catbox.moe/g02uky.jpeg",
  "https://files.catbox.moe/dlsecl.jpeg",
  "https://files.catbox.moe/dvxz34.jpeg",
  "https://files.catbox.moe/0sqxb4.jpeg",
  "https://files.catbox.moe/gc5glp.jpeg",
  "https://files.catbox.moe/jtthwt.jpeg",
  "https://files.catbox.moe/6b6foe.jpeg",
  "https://files.catbox.moe/4y2cy9.jpeg",
  "https://files.catbox.moe/m0n7n6.jpeg",
  "https://files.catbox.moe/hdjtdf.jpeg",
  "https://files.catbox.moe/lik1qv.jpeg",
  "https://files.catbox.moe/8kqh1p.jpeg",
  "https://files.catbox.moe/nw50e4.jpeg",
  "https://files.catbox.moe/s00uya.jpeg",
  "https://files.catbox.moe/8rzg8j.jpeg",
  "https://files.catbox.moe/6g2b4g.jpeg",
  "https://files.catbox.moe/jb3wyk.jpeg",
  "https://files.catbox.moe/om5lc2.jpeg",
  "https://files.catbox.moe/2bvv4p.jpeg",
  "https://files.catbox.moe/8fkpzo.jpeg",
  "https://files.catbox.moe/niyeg5.jpeg",
  "https://files.catbox.moe/kwljb4.jpeg",
  "https://files.catbox.moe/zre1nb.jpeg",
  "https://files.catbox.moe/zgssc7.jpeg",
  "https://files.catbox.moe/qqi9tf.jpeg",
  "https://files.catbox.moe/i0mtoe.jpeg",
  "https://files.catbox.moe/usade2.jpeg",
  "https://files.catbox.moe/0s0yk8.jpeg",
  "https://files.catbox.moe/j5l60f.jpeg",
  "https://files.catbox.moe/0vignh.jpeg",
  "https://files.catbox.moe/x9tk87.jpeg",
  "https://files.catbox.moe/egr4us.jpeg",
  "https://files.catbox.moe/dz2iqh.jpeg",
  "https://files.catbox.moe/4j4b8n.jpeg",
  "https://files.catbox.moe/2ttb23.jpeg",
  "https://files.catbox.moe/jn21cv.jpeg",
  "https://files.catbox.moe/zzl08n.jpeg",
  "https://files.catbox.moe/n8dszc.jpeg",
  "https://files.catbox.moe/kedob1.jpeg",
  "https://files.catbox.moe/x1s9q1.jpeg",
  "https://files.catbox.moe/2z8enf.jpeg",
  "https://files.catbox.moe/zffjyi.jpeg",
  "https://files.catbox.moe/w1k4wv.jpeg",
  "https://files.catbox.moe/uo20wy.jpeg",
  "https://files.catbox.moe/486q61.jpeg",
  "https://files.catbox.moe/kgyfzw.jpeg",
  "https://files.catbox.moe/gxzewp.jpeg",
  "https://files.catbox.moe/0evfpf.jpeg",
  "https://files.catbox.moe/n62rgl.jpeg",
  "https://files.catbox.moe/hgkyaa.jpeg",
  "https://files.catbox.moe/q9aflp.jpeg",
  "https://files.catbox.moe/b07k4r.jpeg",
  "https://files.catbox.moe/q1nr2e.jpeg",
  "https://files.catbox.moe/z5k0oq.jpeg",
  "https://files.catbox.moe/hsy8ef.jpeg",
  "https://files.catbox.moe/lc0k0y.jpeg",
  "https://files.catbox.moe/ofzwi5.jpeg",
  "https://files.catbox.moe/olbqis.jpeg",
  "https://files.catbox.moe/w2slhm.jpeg",
  "https://files.catbox.moe/gax8d3.jpeg",
  "https://files.catbox.moe/2uzalf.jpeg",
  "https://files.catbox.moe/rqipcp.jpeg",
  "https://files.catbox.moe/cwxii0.jpeg",
  "https://files.catbox.moe/xkuydd.jpeg",
  "https://files.catbox.moe/ddx4sf.jpeg",
  "https://files.catbox.moe/dxlqh8.jpeg",
  "https://files.catbox.moe/9l33q0.jpeg",
  "https://files.catbox.moe/c3c7oh.jpeg",
  "https://files.catbox.moe/ys3eo9.jpeg",
  "https://files.catbox.moe/shc1nb.jpeg",
  "https://files.catbox.moe/c54ffp.jpeg",
  "https://files.catbox.moe/viugxw.jpeg",
  "https://files.catbox.moe/j3x59w.jpeg",
  "https://files.catbox.moe/ztzcva.jpeg",
  "https://files.catbox.moe/quzih0.jpeg",
  "https://files.catbox.moe/91v43h.jpeg",
  "https://files.catbox.moe/4mstm7.jpeg",
  "https://files.catbox.moe/dhwer5.jpeg",
  "https://files.catbox.moe/fgndyy.jpeg",
  "https://files.catbox.moe/sr9jtx.jpeg",
  "https://files.catbox.moe/24dezt.jpeg",
  "https://files.catbox.moe/b964xg.jpeg"
]
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2);
  var data = await Currencies.getData(event.senderID);
  var exp =  data.exp;
  var money = data.money
      if(money < 10000) api.sendMessage(`Bạn cần 10000 đô để xem ảnh ?`,event.threadID,event.messageID)
          else {
   Currencies.decreaseMoney(event.senderID, 10000)
   api.sendMessage({body:`𝗦𝘂𝗼̂́𝘁 𝗻𝗴𝗮̀𝘆 𝗱𝘂́ 𝗱𝘂́ 😼\n» 𝗦𝗼̂́ 𝗱𝘂̛: -10000 đô «\n𝗦𝗼̂́ 𝗮̉𝗻𝗵: ${link.length}`,attachment: await global.tools.streamURL(link[Math.floor(Math.random() * link.length)], "jpg")}, event.threadID, event.messageID); 
     }
};