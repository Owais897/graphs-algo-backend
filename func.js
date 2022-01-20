var jsgraphs = require("js-graph-algorithms");
const { performance } = require("perf_hooks");

exports.setStatus = (req, res, next) => {
  const body = req.body;
  console.log("body---------: ", body);
  res.status(200).send("responseresponseresponse");
};

exports.getDijkastra = (req, res, next) => {
  try {
    var startTime = performance.now();
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
    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getBellmanFord = (req, res, next) => {
  try {
    var startTime = performance.now();
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
          result.push(
            `from edge ${e.from()} -> ${e.to()} = ${e.weight}(weight)`
          );
        }
        console.log("=====path from 0 to " + v + " end==========");
        console.log("=====distance: " + bf.distanceTo(v) + "=========");
      }
    }
    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getFloydWarshall = (req, res, next) => {
  try {
    var startTime = performance.now();
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
    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send([graph.distance]);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getKruskal = (req, res, next) => {
  try {
    var startTime = performance.now();
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

    let result = [];
    for (var i = 0; i < mst.length; ++i) {
      var e = mst[i];
      var v = e.either();
      var w = e.other(v);
      console.log("(" + v + ", " + w + "): " + e.weight);
      result.push("(" + v + ", " + w + "): " + e.weight);
    }
    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send([...result]);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getPrims = (req, res, next) => {
  try {
    const body = req.body;
    // console.log("body---------: ", body);
    var startTime = performance.now();

    var g = new jsgraphs.WeightedDiGraph(body.nodes.length);
    console.log("aaaaaaaaaaaaaaa");
    body.edges.forEach((v) => {
      console.log("v: ", v);
      g.addEdge(new jsgraphs.Edge(v.from, v.to, v.weight));
    });
    console.log("ssssssssssssssssss");
    var prim = new jsgraphs.KruskalMST(g);
    console.log("prim: ", prim);

    var mst = prim.mst;

    let result = [];
    for (var i = 0; i < mst.length; ++i) {
      var e = mst[i];
      var v = e.either();
      var w = e.other(v);
      console.log("(" + v + ", " + w + "): " + e.weight);
      result.push("(" + v + ", " + w + "): " + e.weight);
    }

    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send([...result]);
  } catch (error) {
    console.log("error: ", error);
  }
};
exports.getBoruvka = (req, res, next) => {
  try {
    var startTime = performance.now();
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
    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send([...k]);
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.getCluster = (req, res, next) => {
  try {
    var startTime = performance.now();
    const body = req.body;
    console.log("body---------: ", body);
    let Graph = require("graph-data-structure");
    var g = Graph();

    body.edges.forEach((v) => {
      g.addEdge(v.from, v.to, v.weight);
    });
    let n = g.nodes();
    let t = 0;

    n.map((v) => {
      let k = g.indegree(v);
      t += k;
      console.log("k: ", k);
    });

    console.log("t : ", t);

    console.log("ssssssssssssssssss");
    let result = [t / n.length / 10];
    var endTime = performance.now();

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);

    res.status(200).send(result);
  } catch (error) {
    console.log("error: ", error);
  }
};
