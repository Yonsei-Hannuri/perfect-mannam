import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function NetworkGraph({ nodes, edges, width, height, margin }) {
  console.log(nodes);
  console.log(edges);
  const ref = useRef();
  useEffect(() => {
    const currentElement = ref.current;
    const svg = d3
      .select(currentElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    for (let n of nodes) {
      n['x'] = 50;
      n['y'] = 50;
    }

    const elem = svg
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      );

    const links = [];
    for (let edge of edges) {
      links.push({
        source: nodes.filter((e) => e.id === edge.source)[0],
        target: nodes.filter((e) => e.id === edge.target)[0],
      });
    }

    const circle = elem
      .append('ellipse')
      .attr('rx', 50)
      .attr('ry', 30)
      .attr('stroke', 'black')
      .attr('fill', 'white');

    const link = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .style('stroke', '#aaa')
      .attr('x1', (d) => {
        console.log(d);
        return d.source.x;
      })
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    elem
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(function (d) {
        return d.name;
      });

    function dragstarted(event, d) {
      d3.select(this).raise().attr('stroke', 'black');
    }

    function dragged(event, d) {
      const [x, y] = d3.pointer(event, svg.node());

      d.x = x;
      d.y = y;
      d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
      updateLinks();
    }

    function dragended(event, d) {
      d3.select(this).attr('stroke', null);
    }

    function updateLinks() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
    }
  }, []);

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
