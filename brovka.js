class Edge {
  constructor(weight, src, dest) {
    this.weight = weight;
    this.dest = dest;
    this.src = src;
    this.next = null;
  }
}
class State {
  constructor(parent, rank) {
    this.parent = parent;
    this.rank = rank;
  }
}
class Graph {
  constructor(vertices) {
    this.vertices = vertices;
    this.graphEdge = [];
    for (var i = 0; i < this.vertices; ++i) {
      this.graphEdge.push([]);
    }
  }
  addEdge(src, dest, w) {
    if (dest < 0 || dest >= this.vertices || src < 0 || src >= this.vertices) {
      return;
    }
    // add node edge
    this.graphEdge[src].push(new Edge(w, src, dest));
    if (dest == src) {
      return;
    }
    this.graphEdge[dest].push(new Edge(w, dest, src));
  }
  printGraph() {
    process.stdout.write("\n Graph Adjacency List ");
    for (var i = 0; i < this.vertices; ++i) {
      process.stdout.write(" \n [" + i + "] :");
      // iterate edges of i node
      for (var j = 0; j < this.graphEdge[i].length; ++j) {
        process.stdout.write("  " + this.graphEdge[i][j].dest);
      }
    }
  }
  find(subsets, i) {
    if (subsets[i].parent != i) {
      subsets[i].parent = this.find(subsets, subsets[i].parent);
    }
    return subsets[i].parent;
  }
  findUnion(subsets, x, y) {
    var a = this.find(subsets, x);
    var b = this.find(subsets, y);
    if (subsets[a].rank < subsets[b].rank) {
      subsets[a].parent = b;
    } else if (subsets[a].rank > subsets[b].rank) {
      subsets[b].parent = a;
    } else {
      subsets[b].parent = a;
      subsets[a].rank++;
    }
  }
  boruvkaMST() {
    let response = [];
    // Contain weight sum in mst path
    var result = 0;
    var selector = this.vertices;
    var subsets = Array(this.vertices).fill(null);
    var cheapest = Array(this.vertices).fill(null);
    for (var v = 0; v < this.vertices; ++v) {
      subsets[v] = new State(v, 0);
    }
    while (selector > 1) {
      for (var v = 0; v < this.vertices; ++v) {
        cheapest[v] = null;
      }
      for (var k = 0; k < this.vertices; k++) {
        for (var i = 0; i < this.graphEdge[k].length; ++i) {
          var set1 = this.find(subsets, this.graphEdge[k][i].src);
          var set2 = this.find(subsets, this.graphEdge[k][i].dest);
          if (set1 != set2) {
            if (cheapest[k] == null) {
              cheapest[k] = this.graphEdge[k][i];
            } else if (cheapest[k].weight > this.graphEdge[k][i].weight) {
              cheapest[k] = this.graphEdge[k][i];
            }
          }
        }
      }
      for (var i = 0; i < this.vertices; i++) {
        if (cheapest[i] != null) {
          var set1 = this.find(subsets, cheapest[i].src);
          var set2 = this.find(subsets, cheapest[i].dest);
          if (set1 != set2) {
            // Reduce a edge
            selector--;
            this.findUnion(subsets, set1, set2);
            // Display the edge connection
            process.stdout.write(
              "\n Include Edge (" +
                cheapest[i].src +
                " - " +
                cheapest[i].dest +
                ") weight " +
                cheapest[i].weight
            );
            response.push(
              "Include Edge (" +
                cheapest[i].src +
                " - " +
                cheapest[i].dest +
                ") weight " +
                cheapest[i].weight
            );
            // Add weight
            result += cheapest[i].weight;
          }
        }
      }
    }
    console.log("\n Calculated total weight of MST is " + result);
    return response;
  }
}

module.exports = Graph;
