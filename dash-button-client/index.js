var svr = new Server(),
  tide   = new DashButton("12:34:56:78:90:12", function () { console.log("Tide pressed"); });

svr.register(tide)
  .start("192.168.1.10");