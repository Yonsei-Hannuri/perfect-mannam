import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function NetworkGraph({ nodes, edges, width, height, margin }) {
  const ref = useRef();

  useEffect(() => {
    const currentElement = ref.current;
    const elem = d3.select(currentElement);
    const svg = elem
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const link = svg
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .style('stroke', '#aaa');

    // Initialize the nodes
    const node = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .style('fill', '#69b3a2');

    // Let's list the force we wanna apply on the network
    const simulation = d3
      .forceSimulation(nodes) // Force algorithm is applied to data.nodes
      .force(
        'link',
        d3
          .forceLink() // This force provides links between nodes
          .id(function (d) {
            return d.id;
          }) // This provide  the id of a node
          .links(edges), // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force('center', d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
      .on('end', ticked);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
      link
        .attr('x1', function (d) {
          return d.source.x;
        })
        .attr('y1', function (d) {
          return d.source.y;
        })
        .attr('x2', function (d) {
          return d.target.x;
        })
        .attr('y2', function (d) {
          return d.target.y;
        });

      node
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        });
    }
  }, [nodes, edges]);

  return (
    <>
      <h2> Network </h2>
      <div
        ref={ref}
        style={{
          width: '100%',
        }}
      />
    </>
  );
}
