const caigiaphaitra = 10000;
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "mông",
  version: "2.1.0",
  aliases: ["đít", "đích"],
  role: 0,
  author: "Hùng",
  info: "Random Ảnh Mông Gái Xinh Cực Bổ Mắt ( Lưu Ý Đây Là Lệnh Ảnh 18+ Cân Nhắc Trước Khi Sử Dụng)",
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
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
  var link = [
  "https://files.catbox.moe/mskr2n.jpeg",
  "https://files.catbox.moe/na8vc9.jpeg",
  "https://files.catbox.moe/ts6koi.jpeg",
  "https://files.catbox.moe/0gw93g.jpeg",
  "https://files.catbox.moe/6fehma.jpeg",
  "https://files.catbox.moe/gio169.jpeg",
  "https://files.catbox.moe/l7k0ke.jpeg",
  "https://files.catbox.moe/lox70t.jpeg",
  "https://files.catbox.moe/hkymxp.jpeg",
  "https://files.catbox.moe/0lu8ab.jpeg",
  "https://files.catbox.moe/8ps1ox.jpeg",
  "https://files.catbox.moe/cbmu30.jpeg",
  "https://files.catbox.moe/ktx05m.jpeg",
  "https://files.catbox.moe/ixnqo5.jpeg",
  "https://files.catbox.moe/5op3u7.jpeg",
  "https://files.catbox.moe/vu0fvg.jpeg",
  "https://files.catbox.moe/dhi9co.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/n0s3ka.jpeg",
  "https://files.catbox.moe/5t4nmz.jpeg",
  "https://files.catbox.moe/1p0d80.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/wpk68l.jpeg",
  "https://files.catbox.moe/ljzaf9.jpeg",
  "https://files.catbox.moe/o8i3y3.jpeg",
  "https://files.catbox.moe/3glbo0.jpeg",
  "https://files.catbox.moe/hs4odo.jpeg",
  "https://files.catbox.moe/zn20kq.jpeg",
  "https://files.catbox.moe/id38vc.jpeg",
  "https://files.catbox.moe/l2jpsn.jpeg",
  "https://files.catbox.moe/ksdm97.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/wcirkl.jpeg",
  "https://files.catbox.moe/pxp42q.jpeg",
  "https://files.catbox.moe/8n6gbh.jpeg",
  "https://files.catbox.moe/galw34.jpeg",
  "https://files.catbox.moe/7fv6mh.jpeg",
  "https://files.catbox.moe/h5xfa1.jpeg",
  "https://files.catbox.moe/mptxlv.jpeg",
  "https://files.catbox.moe/l6y4kz.jpeg",
  "https://files.catbox.moe/ijj4ls.jpeg",
  "https://files.catbox.moe/vxtq4q.jpeg",
  "https://files.catbox.moe/ap36lp.jpeg",
  "https://files.catbox.moe/048e6v.jpeg",
  "https://files.catbox.moe/h278ya.jpeg",
  "https://files.catbox.moe/kqqaaq.jpeg",
  "https://files.catbox.moe/qpju44.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/1esd0v.jpeg",
  "https://files.catbox.moe/frh8cb.jpeg",
  "https://files.catbox.moe/1rpxsv.jpeg",
  "https://files.catbox.moe/akjccv.jpeg",
  "https://files.catbox.moe/u7kyds.jpeg",
  "https://files.catbox.moe/dfr95q.jpeg",
  "https://files.catbox.moe/ritnhf.jpeg",
  "https://files.catbox.moe/e0gh41.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/iadz0p.jpeg",
  "https://files.catbox.moe/av7g45.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/7254li.jpeg",
  "https://files.catbox.moe/y78yjn.jpeg",
  "https://files.catbox.moe/zjz9bt.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/7twm5r.jpeg",
  "https://files.catbox.moe/qdgj5a.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/2t361t.jpeg",
  "https://files.catbox.moe/ipjao1.jpeg",
  "https://files.catbox.moe/69n15r.jpeg",
  "https://files.catbox.moe/1i893o.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/15sk7r.jpeg",
  "https://files.catbox.moe/b75j2x.jpeg",
  "https://files.catbox.moe/40vh2s.jpeg",
  "https://files.catbox.moe/9pbguj.jpeg",
  "https://files.catbox.moe/qoyqbc.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/taf9kj.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/519n99.jpeg",
  "https://files.catbox.moe/kpbbdi.jpeg",
  "https://files.catbox.moe/3nt3c6.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/yxhcxf.png",
  "https://files.catbox.moe/9jqchc.jpeg",
  "https://files.catbox.moe/lbvb1t.jpeg",
  "https://files.catbox.moe/kbg9yb.jpeg",
  "https://files.catbox.moe/piqntt.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/kgj3u3.jpeg",
  "https://files.catbox.moe/e8891k.jpeg",
  "https://files.catbox.moe/rnh232.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/yairel.jpeg",
  "https://files.catbox.moe/ydrjrg.jpeg",
  "https://files.catbox.moe/5v5lu3.jpeg",
  "https://files.catbox.moe/lsxfgl.jpeg",
  "https://files.catbox.moe/kontd5.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/kxont4.jpeg",
  "https://files.catbox.moe/yiiktz.jpeg",
  "https://files.catbox.moe/wlh1ue.jpeg",
  "https://files.catbox.moe/yqqag1.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/rwmbrt.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/coh4u1.jpeg",
  "https://files.catbox.moe/we0tgv.jpeg",
  "https://files.catbox.moe/l3xu9h.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/eoq7nn.jpeg",
  "https://files.catbox.moe/yb759r.jpeg",
  "https://files.catbox.moe/k53rdp.jpeg",
  "https://files.catbox.moe/0yt3yk.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/c870kj.jpeg",
  "https://files.catbox.moe/jw283n.jpeg",
  "https://files.catbox.moe/i92os8.jpeg",
  "https://files.catbox.moe/30vmpy.jpeg",
  "https://files.catbox.moe/ljkun6.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/zpup8d.jpeg",
  "https://files.catbox.moe/coh4u1.jpeg",
  "https://files.catbox.moe/we0tgv.jpeg",
  "https://files.catbox.moe/mitycq.jpeg",
  "https://files.catbox.moe/sk894n.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/9cltpb.jpeg",
  "https://files.catbox.moe/eoq7nn.jpeg",
  "https://files.catbox.moe/03u2l8.jpeg",
  "https://files.catbox.moe/pte9bs.jpeg",
  "https://files.catbox.moe/jtyslr.jpeg",
  "https://files.catbox.moe/4ubig0.jpeg",
  "https://files.catbox.moe/qw4588.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/0yt3yk.jpeg",
  "https://files.catbox.moe/jw283n.jpeg",
  "https://files.catbox.moe/c870kj.jpeg",
  "https://files.catbox.moe/30vmpy.jpeg",
  "https://files.catbox.moe/ljkun6.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/y547ug.jpeg",
  "https://files.catbox.moe/jtnp2y.jpeg",
  "https://files.catbox.moe/e6hnsh.jpeg",
  "https://files.catbox.moe/88dmbb.jpeg",
  "https://files.catbox.moe/wb8dr8.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/avu9l9.jpeg",
  "https://files.catbox.moe/idn7wu.jpeg",
  "https://files.catbox.moe/cqz6lw.jpeg",
  "https://files.catbox.moe/he2c9b.jpeg",
  "https://files.catbox.moe/53i2mq.jpeg",
  "https://files.catbox.moe/8lsid4.jpeg",
  "https://files.catbox.moe/mir65a.jpeg",
  "https://files.catbox.moe/n8jxum.jpeg",
  "https://files.catbox.moe/tfa16v.jpeg",
  "https://files.catbox.moe/z5q4jw.jpeg",
  "https://files.catbox.moe/pig8uw.jpeg",
  "https://files.catbox.moe/yimigf.jpeg",
  "https://files.catbox.moe/zx4ynf.jpeg",
  "https://files.catbox.moe/e0j4oz.jpeg",
  "https://files.catbox.moe/y6nlsp.jpeg",
  "https://files.catbox.moe/m5ztgp.jpeg",
  "https://files.catbox.moe/b3lbli.jpeg",
  "https://files.catbox.moe/23smpr.jpeg",
  "https://files.catbox.moe/o8i3y3.jpeg",
  "https://files.catbox.moe/80uu2t.jpeg",
  "https://files.catbox.moe/ma0325.jpeg",
  "https://files.catbox.moe/zn20kq.jpeg",
  "https://files.catbox.moe/ljzaf9.jpeg",
  "https://files.catbox.moe/hs4odo.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/3glbo0.jpeg",
  "https://files.catbox.moe/q3dtfy.jpeg",
  "https://files.catbox.moe/q8la6w.jpeg",
  "https://files.catbox.moe/62hsih.jpeg",
  "https://files.catbox.moe/39zof9.jpeg",
  "https://files.catbox.moe/z9iqww.jpg",
  "https://files.catbox.moe/mrxkq9.jpeg",
  "https://files.catbox.moe/7sq3gf.jpeg",
  "https://files.catbox.moe/icsr9m.jpeg",
  "https://files.catbox.moe/r8wrml.jpeg",
  "https://files.catbox.moe/9onnk8.jpeg",
  "https://files.catbox.moe/0hd0kj.jpeg",
  "https://files.catbox.moe/a0al94.jpeg",
  "https://files.catbox.moe/jtmvti.jpeg",
  "https://files.catbox.moe/2cdvgt.jpeg",
  "https://files.catbox.moe/8z5v05.jpeg",
  "https://files.catbox.moe/audueb.jpeg",
  "https://files.catbox.moe/cnry42.jpeg",
  "https://files.catbox.moe/10m6fj.jpeg",
  "https://files.catbox.moe/q094cs.jpeg",
  "https://files.catbox.moe/u9813l.jpeg",
  "https://files.catbox.moe/emt1mh.jpeg",
  "https://files.catbox.moe/u6ozqy.jpeg",
  "https://files.catbox.moe/hxbmvc.jpeg",
  "https://files.catbox.moe/gtufog.jpeg",
  "https://files.catbox.moe/v48x8k.jpeg",
  "https://files.catbox.moe/pc08e3.jpeg",
  "https://files.catbox.moe/uuc8r0.jpeg",
  "https://files.catbox.moe/xltb2o.jpeg",
  "https://files.catbox.moe/nc6ry3.jpeg",
  "https://files.catbox.moe/60wn21.jpeg",
  "https://files.catbox.moe/0x1e1m.jpeg",
  "https://files.catbox.moe/lnr7ub.jpeg",
  "https://files.catbox.moe/8h28nl.jpeg",
  "https://files.catbox.moe/bp4urb.jpeg",
  "https://files.catbox.moe/3iws9d.jpeg",
  "https://files.catbox.moe/78nsei.jpeg",
  "https://files.catbox.moe/3l3fo8.jpeg",
  "https://files.catbox.moe/c7fwbd.jpeg",
  "https://files.catbox.moe/478f0k.jpeg",
  "https://files.catbox.moe/rbvpjk.jpeg",
  "https://files.catbox.moe/scr8fe.jpeg",
  "https://files.catbox.moe/q1bddb.jpeg",
  "https://files.catbox.moe/n6cbxh.jpeg",
  "https://files.catbox.moe/hjr2zu.jpeg",
  "https://files.catbox.moe/41l06o.jpeg",
  "https://files.catbox.moe/u6sm4z.jpeg",
  "https://files.catbox.moe/kl64o4.jpeg",
  "https://files.catbox.moe/4yb7ni.jpeg",
  "https://files.catbox.moe/77zzct.jpeg",
  "https://files.catbox.moe/17hzfc.jpeg",
  "https://files.catbox.moe/orqp9j.jpeg",
  "https://files.catbox.moe/vicc9l.jpeg",
  "https://files.catbox.moe/2j0nby.jpeg",
  "https://files.catbox.moe/8xgtsg.jpeg",
  "https://files.catbox.moe/8hav6c.jpeg",
  "https://files.catbox.moe/k43n5z.jpeg",
  "https://files.catbox.moe/hlrsot.jpeg",
  "https://files.catbox.moe/n3ftlc.jpeg",
  "https://files.catbox.moe/3ninz2.jpeg",
  "https://files.catbox.moe/d4a8wc.jpeg",
  "https://files.catbox.moe/onyzok.jpeg",
  "https://files.catbox.moe/crtd9r.jpeg",
  "https://files.catbox.moe/l1qz2x.jpeg",
  "https://files.catbox.moe/ttl6r4.jpeg",
  "https://files.catbox.moe/dy3o00.jpeg",
  "https://files.catbox.moe/fbvpb5.jpeg",
  "https://files.catbox.moe/nohj9b.jpeg",
  "https://files.catbox.moe/l2dbi1.jpeg",
  "https://files.catbox.moe/dkhygt.jpeg",
  "https://files.catbox.moe/u22r7a.jpeg",
  "https://files.catbox.moe/slk97b.jpeg",
  "https://files.catbox.moe/hh620k.jpeg",
  "https://files.catbox.moe/z34gnp.jpeg",
  "https://files.catbox.moe/73glhy.jpeg",
  "https://files.catbox.moe/83xf4g.jpeg",
  "https://files.catbox.moe/8bu30d.jpeg",
  "https://files.catbox.moe/2jses2.jpeg",
  "https://files.catbox.moe/zb24fc.jpeg",
  "https://files.catbox.moe/84hfho.jpeg",
  "https://files.catbox.moe/jfdis5.jpeg",
  "https://files.catbox.moe/1zdlhf.jpeg",
  "https://files.catbox.moe/smqlxn.jpeg",
  "https://files.catbox.moe/lt8prt.jpeg",
  "https://files.catbox.moe/qwsg4r.jpeg",
  "https://files.catbox.moe/dfkjpg.jpeg",
  "https://files.catbox.moe/2ak6qt.jpeg",
  "https://files.catbox.moe/62tvp0.jpeg",
  "https://files.catbox.moe/uvb5h3.jpeg",
  "https://files.catbox.moe/nbe4id.jpeg",
  "https://files.catbox.moe/j7q7ks.jpeg",
  "https://files.catbox.moe/1onu9p.jpeg",
  "https://files.catbox.moe/vlcurt.jpeg",
  "https://files.catbox.moe/om9lxx.png",
  "https://files.catbox.moe/qrp595.jpeg",
  "https://files.catbox.moe/vox17c.jpeg",
  "https://files.catbox.moe/oig29c.jpeg",
  "https://files.catbox.moe/xqrwam.jpeg",
  "https://files.catbox.moe/mhndmp.jpeg",
  "https://files.catbox.moe/cycg6s.jpeg",
  "https://files.catbox.moe/f6f76u.jpeg",
  "https://files.catbox.moe/mwm3fx.jpeg",
  "https://files.catbox.moe/4xj8s2.jpeg",
  "https://files.catbox.moe/941zlw.jpeg",
  "https://files.catbox.moe/5wiw96.jpeg",
  "https://files.catbox.moe/s2vijo.jpeg",
  "https://files.catbox.moe/wwo5lo.jpeg",
  "https://files.catbox.moe/hluuag.jpeg",
  "https://files.catbox.moe/9rnipv.jpeg",
  "https://files.catbox.moe/0xxa7s.jpeg",
  "https://files.catbox.moe/m5h7gc.jpeg",
  "https://files.catbox.moe/73j287.jpeg",
  "https://files.catbox.moe/nkjlb2.jpeg",
  "https://files.catbox.moe/18e5o8.jpeg",
  "https://files.catbox.moe/bh2aqz.jpeg",
  "https://files.catbox.moe/e035ro.jpeg",
  "https://files.catbox.moe/6znujo.jpeg",
  "https://files.catbox.moe/2qng90.jpeg",
  "https://files.catbox.moe/g061vi.jpeg",
  "https://files.catbox.moe/1zkms4.jpeg",
  "https://files.catbox.moe/525i2y.jpeg",
  "https://files.catbox.moe/kw2ild.jpeg",
  "https://files.catbox.moe/ucbyc2.jpeg",
  "https://files.catbox.moe/gaxqvp.jpeg",
  "https://files.catbox.moe/i9spga.jpeg",
  "https://files.catbox.moe/kk68wm.jpeg",
  "https://files.catbox.moe/7ptqk1.jpeg",
  "https://files.catbox.moe/3jhosd.jpeg",
  "https://files.catbox.moe/iyul2b.jpeg",
  "https://files.catbox.moe/5uxw02.jpeg",
  "https://files.catbox.moe/pfmm7l.jpeg",
  "https://files.catbox.moe/eb6uwt.jpeg",
  "https://files.catbox.moe/9wnpw0.jpeg",
  "https://files.catbox.moe/qjtcjh.jpeg",
  "https://files.catbox.moe/bnmn7k.jpeg",
  "https://files.catbox.moe/mnhsoc.jpeg",
  "https://files.catbox.moe/d6nvo1.jpeg",
  "https://files.catbox.moe/xcnc16.jpeg",
  "https://files.catbox.moe/tq66nr.jpeg",
  "https://files.catbox.moe/qe6ks2.jpeg",
  "https://files.catbox.moe/g0up3u.jpeg",
  "https://files.catbox.moe/y2gxx2.jpeg",
  "https://files.catbox.moe/gb3o40.jpeg",
  "https://files.catbox.moe/ovgpg4.jpeg",
  "https://files.catbox.moe/ep7h4r.jpeg",
  "https://files.catbox.moe/yia9te.jpeg",
  "https://files.catbox.moe/67z9re.jpeg",
  "https://files.catbox.moe/6itfz8.jpeg",
  "https://files.catbox.moe/64gbmr.jpeg",
  "https://files.catbox.moe/rpoxf9.jpeg",
  "https://files.catbox.moe/lmp4m9.jpeg",
  "https://files.catbox.moe/im3zsh.jpeg",
  "https://files.catbox.moe/nhhqno.jpeg",
  "https://files.catbox.moe/tdh9oa.jpeg",
  "https://files.catbox.moe/ntchc2.jpeg",
  "https://files.catbox.moe/0znp5h.jpeg",
  "https://files.catbox.moe/jrblib.jpeg",
  "https://files.catbox.moe/zr3ptv.jpeg",
  "https://files.catbox.moe/nk9wya.jpeg",
  "https://files.catbox.moe/0j4nla.jpeg",
  "https://files.catbox.moe/369512.jpeg",
  "https://files.catbox.moe/ds50m3.jpeg",
  "https://files.catbox.moe/ntktil.jpeg",
  "https://files.catbox.moe/rpnk4g.jpeg",
  "https://files.catbox.moe/em5w8f.jpeg",
  "https://files.catbox.moe/rv0mml.jpeg",
  "https://files.catbox.moe/22l1ly.jpeg",
  "https://files.catbox.moe/38d690.jpeg",
  "https://files.catbox.moe/y9ttjo.jpeg",
  "https://files.catbox.moe/zg0r0m.jpeg",
  "https://files.catbox.moe/rfypzc.jpeg",
  "https://files.catbox.moe/b4miiq.jpeg",
  "https://files.catbox.moe/u9i8o0.jpeg",
  "https://files.catbox.moe/ygwtx3.jpeg",
  "https://files.catbox.moe/t598d9.jpeg",
  "https://files.catbox.moe/xz7o91.jpeg",
  "https://files.catbox.moe/a69dmp.jpeg",
  "https://files.catbox.moe/ars147.jpeg",
  "https://files.catbox.moe/2lrixm.jpeg",
  "https://files.catbox.moe/rpvdz7.jpeg",
  "https://files.catbox.moe/xsdb3s.jpeg",
  "https://files.catbox.moe/t4b8on.jpeg",
  "https://files.catbox.moe/paj79r.jpeg",
  "https://files.catbox.moe/znyjwt.jpeg",
  "https://files.catbox.moe/w0u8jf.jpeg",
  "https://files.catbox.moe/mzuik6.jpeg",
  "https://files.catbox.moe/5tc7dy.jpeg",
  "https://files.catbox.moe/ze8n4n.jpeg",
  "https://files.catbox.moe/6sfy1j.jpeg",
  "https://files.catbox.moe/2v9r9z.jpeg",
  "https://files.catbox.moe/fl68id.jpeg",
  "https://files.catbox.moe/e94flj.jpeg",
  "https://files.catbox.moe/byohr6.jpeg",
  "https://files.catbox.moe/nhkirq.jpeg",
  "https://files.catbox.moe/wtjy58.jpeg",
  "https://files.catbox.moe/ekva3e.jpeg",
  "https://files.catbox.moe/0zz1zw.jpeg",
  "https://files.catbox.moe/qwc6bx.jpeg",
  "https://files.catbox.moe/frm1f8.jpeg",
  "https://files.catbox.moe/l1jls0.jpeg",
  "https://files.catbox.moe/9isdru.jpeg",
  "https://files.catbox.moe/u6l84b.jpeg",
  "https://files.catbox.moe/r1d1wx.jpeg",
  "https://files.catbox.moe/skgyna.jpeg",
  "https://files.catbox.moe/pibrts.jpeg",
  "https://files.catbox.moe/6mkb18.jpeg",
  "https://files.catbox.moe/puvbcb.jpeg",
  "https://files.catbox.moe/3c9rur.jpeg",
  "https://files.catbox.moe/lyckjb.jpeg",
  "https://files.catbox.moe/vl1qt1.jpeg",
  "https://files.catbox.moe/pdlubb.jpeg",
  "https://files.catbox.moe/909u7c.jpeg",
  "https://files.catbox.moe/369512.jpeg",
  "https://files.catbox.moe/itneks.jpeg",
  "https://files.catbox.moe/r68m68.jpeg",
  "https://files.catbox.moe/f6suif.jpeg",
  "https://files.catbox.moe/jrmsbi.jpeg",
  "https://files.catbox.moe/x1a958.jpeg",
  "https://files.catbox.moe/5iaq1d.jpeg",
  "https://files.catbox.moe/tyo423.jpeg",
  "https://files.catbox.moe/jfz914.jpeg",
  "https://files.catbox.moe/534dsj.jpeg",
  "https://files.catbox.moe/uryqdd.jpeg",
  "https://files.catbox.moe/t7xtks.jpeg",
  "https://files.catbox.moe/669drd.jpeg",
  "https://files.catbox.moe/j5crps.jpeg",
  "https://files.catbox.moe/iszug8.jpeg",
  "https://files.catbox.moe/vgsmqe.jpeg",
  "https://files.catbox.moe/kcod6q.jpeg",
  "https://files.catbox.moe/cm9pv8.jpeg",
  "https://files.catbox.moe/ibvhg1.jpeg",
  "https://files.catbox.moe/tilto6.jpeg",
  "https://files.catbox.moe/fwvd3s.jpeg",
  "https://files.catbox.moe/5phonu.jpeg",
  "https://files.catbox.moe/94ifv7.jpeg",
  "https://files.catbox.moe/6l2fd9.jpeg",
  "https://files.catbox.moe/2zcopj.jpeg",
  "https://files.catbox.moe/gpw5qx.jpeg",
  "https://files.catbox.moe/q60hpp.jpeg",
  "https://files.catbox.moe/8xgfmw.jpeg",
  "https://files.catbox.moe/gai1ri.jpeg",
  "https://files.catbox.moe/sph5p0.jpeg",
  "https://files.catbox.moe/g9jx43.jpeg",
  "https://files.catbox.moe/2zj8i4.jpeg",
  "https://files.catbox.moe/tcoysy.jpeg",
  "https://files.catbox.moe/x8xmzy.jpeg",
  "https://files.catbox.moe/rgv43p.jpeg",
  "https://files.catbox.moe/6br54q.jpeg",
  "https://files.catbox.moe/6kmc9k.jpeg",
  "https://files.catbox.moe/8r6i2k.jpeg",
  "https://files.catbox.moe/wk7zxj.jpeg",
  "https://files.catbox.moe/mznwnt.jpeg",
  "https://files.catbox.moe/uy3xq9.jpeg",
  "https://files.catbox.moe/zpa2bp.jpeg",
  "https://files.catbox.moe/h2umhn.jpeg",
  "https://files.catbox.moe/kqrfzr.jpeg",
  "https://files.catbox.moe/9zl4zq.jpeg",
  "https://files.catbox.moe/7f6ix7.jpeg",
  "https://files.catbox.moe/8xjgvj.jpeg",
  "https://files.catbox.moe/6gh146.jpeg",
  "https://files.catbox.moe/djocj9.jpeg",
  "https://files.catbox.moe/2yfxa9.jpeg",
  "https://files.catbox.moe/9l64s1.jpeg",
  "https://files.catbox.moe/40m7gh.jpeg",
  "https://files.catbox.moe/xdh5yh.jpeg",
  "https://files.catbox.moe/p1d68s.jpeg",
  "https://files.catbox.moe/qidvgk.jpeg",
  "https://files.catbox.moe/8a99ev.jpeg",
  "https://files.catbox.moe/y1amau.jpeg",
  "https://files.catbox.moe/6w5cpi.jpeg",
  "https://files.catbox.moe/4jgw56.jpeg",
  "https://files.catbox.moe/246ti8.jpeg",
  "https://files.catbox.moe/qu1n5f.jpeg",
  "https://files.catbox.moe/xmlzw3.jpeg",
  "https://files.catbox.moe/i8n20e.jpeg",
  "https://files.catbox.moe/pvgjxi.jpeg",
  "https://files.catbox.moe/3l9mtc.jpeg",
  "https://files.catbox.moe/quo3oy.jpeg",
  "https://files.catbox.moe/5wlgde.jpeg",
  "https://files.catbox.moe/ms4e6t.jpeg"
]
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2);
  var data = await Currencies.getData(event.senderID);
  const cc = link[Math.floor(Math.random() * link.length)]
  var exp =  data.exp;
  var money = data.money
      if(money < caigiaphaitra) api.sendMessage(`𝗕𝗮̣𝗻 𝗰𝗮̂̀𝗻 ${caigiaphaitra} đ𝗼̂ đ𝗲̂̉ 𝘅𝗲𝗺 𝗮̉𝗻𝗵 ?`,event.threadID,event.messageID)
          else {
   Currencies.decreaseMoney(event.senderID, caigiaphaitra)
   api.sendMessage({body:`𝗕𝗼̂̉ 𝗺𝗮̆́𝘁 𝗻𝗵𝗲́ 🍑\n» 𝗦𝗼̂́ 𝗱𝘂̛: -${caigiaphaitra} đô «\n🌸 𝗦𝗼̂́ 𝗮̉𝗻𝗵: ${link.length}`,attachment: await global.tools.streamURL(cc, 'jpg')}, event.threadID, event.messageID)
};
}