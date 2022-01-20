var jsgraphs = require("js-graph-algorithms");

exports.setStatus = (req, res, next) => {
  const body = req.body;
  console.log("body---------: ", body);
  res.status(200).send("responseresponseresponse");
};

exports.getDijkastra = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);
    var g = new jsgraphs.WeightedDiGraph(body.nodes.length);
    console.log("aaaaaaaaaaaaaaa");
    body.edges.forEach((v) => {
      console.log("v: ", v);
      g.addEdge(new jsgraphs.Edge(v.from, v.to, v.weight));
    });
    console.log("ssssssssssssssssss");
    var dijkstra = new jsgraphs.Dijkstra(g, 5);
    console.log("dijkstra: ", dijkstra);

    let result = [];
    for (var v = 0; v < g.V; ++v) {
      if (dijkstra.hasPathTo(v)) {
        var path = dijkstra.pathTo(v);
        console.log("=====path from 0 to " + v + " start==========");
        for (var i = 0; i < path.length; ++i) {
          var e = path[i];
          console.log(e.from() + " => " + e.to() + ": " + e.weight);
          result.push(`${e.from()} -> ${e.to()} = ${e.weight}`);
        }
        console.log("=====path from 0 to " + v + " end==========");
        console.log("=====distance: " + dijkstra.distanceTo(v) + "=========");
      }
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getBellmanFord = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);
    var g = new jsgraphs.WeightedDiGraph(body.nodes.length);
    console.log("aaaaaaaaaaaaaaa");
    body.edges.forEach((v) => {
      console.log("v: ", v);
      g.addEdge(new jsgraphs.Edge(v.from, v.to, v.weight));
    });
    console.log("ssssssssssssssssss");
    var bf = new jsgraphs.BellmanFord(g, 5);
    console.log("bf: ", bf);

    let result = [];
    for (var v = 0; v < g.V; ++v) {
      if (bf.hasPathTo(v)) {
        var path = bf.pathTo(v);
        console.log("=====path from 0 to " + v + " start==========");
        for (var i = 0; i < path.length; ++i) {
          var e = path[i];
          console.log(e.from() + " => " + e.to() + ": " + e.weight);
          result.push(`${e.from()} -> ${e.to()} = ${e.weight}`);
        }
        console.log("=====path from 0 to " + v + " end==========");
        console.log("=====distance: " + bf.distanceTo(v) + "=========");
      }
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getFloydWarshall = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);

    console.log("aaaaaaaaaaaaaaa");
    fw = require("floyd-warshall-shortest");
    graph = new fw.FloydWarshall(body.edges);
    console.log("graph: ", graph);

    console.log("ssssssssssssssssss");

    let path = graph.getShortestVisitingPath([
      // ...body.nodes.map((v) => `${v.id}`),
      "0",
      "5",
    ]);
    console.log("path: ", path);
    distance = graph.getShortestDistance("5", "0");
    console.log("distance: ", distance);

    let result = { graph };

    res.status(200).send([graph.distance]);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getKruskal = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);
    var g = new jsgraphs.WeightedDiGraph(body.nodes.length);
    console.log("aaaaaaaaaaaaaaa");
    body.edges.forEach((v) => {
      console.log("v: ", v);
      g.addEdge(new jsgraphs.Edge(v.from, v.to, v.weight));
    });
    console.log("ssssssssssssssssss");
    var kruskal = new jsgraphs.KruskalMST(g);
    console.log("kruskal: ", kruskal);
    var mst = kruskal.mst;

    let result = { mst };
    for (var i = 0; i < mst.length; ++i) {
      var e = mst[i];
      var v = e.either();
      var w = e.other(v);
      console.log("(" + v + ", " + w + "): " + e.weight);
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getPrims = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);
    var g = new jsgraphs.WeightedDiGraph(body.nodes.length);
    console.log("aaaaaaaaaaaaaaa");
    body.edges.forEach((v) => {
      console.log("v: ", v);
      g.addEdge(new jsgraphs.Edge(v.from, v.to, v.weight));
    });
    console.log("ssssssssssssssssss");
    var prim = new jsgraphs.EagerPrimMST(g);
    console.log("prim: ", prim);

    var mst = prim.mst;

    let result = { mst };
    for (var i = 0; i < mst.length; ++i) {
      var e = mst[i];
      var v = e.either();
      var w = e.other(v);
      console.log("(" + v + ", " + w + "): " + e.weight);
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};
exports.getBoruvka = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);
    let Graph = require("./brovka");
    var g = new Graph(body.nodes.length);

    body.edges.forEach((v) => {
      g.addEdge(v.from, v.to, v.weight);
    });
    g.printGraph();
    let k = g.boruvkaMST();
    console.log("k: ", k);

    console.log("ssssssssssssssssss");
    let result = { edgesInclude: k };
    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getCluster = (req, res, next) => {
  try {
    const body = req.body;
    console.log("body---------: ", body);
    let Graph = require("./brovka");
    var g = new Graph(body.nodes.length);

    body.edges.forEach((v) => {
      g.addEdge(v.from, v.to, v.weight);
    });
    g.printGraph();
    let k = g.boruvkaMST();
    console.log("k: ", k);

    console.log("ssssssssssssssssss");
    let result = { edgesInclude: k };
    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};
