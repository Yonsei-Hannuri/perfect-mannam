import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function NetworkGraph({
  nodes,
  edges,
  width,
  height,
  dragstarted,
  dragged,
  dragended,
  onNodeClick,
  onBackgroundClick,
  onLinkClick,
}) {
  useEffect(() => {
    const currentElement = ref.current;
    const handler = (e) => {
      const rect = currentElement.getBoundingClientRect();
      if (onBackgroundClick) onBackgroundClick(e);
    };
    currentElement.addEventListener('click', handler);
    return () => {
      currentElement.removeEventListener('click', handler);
    };
  }, [onBackgroundClick]);

  const ref = useRef();
  useEffect(() => {
    const currentElement = ref.current;
    const svg = d3
      .select(currentElement)
      .call((g) => g.select('svg').remove())
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');
    const links = [];
    for (let edge of edges) {
      links.push({
        source: nodes.filter((e) => e.id === edge.source)[0],
        target: nodes.filter((e) => e.id === edge.target)[0],
      });
    }

    const linkPadding = svg
      .selectAll('.clickable-link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'clickable-link')
      .style('cursor', 'pointer')
      .attr('fill', 'none')
      .attr('stroke', 'transparent') // Make it transparent
      .attr('stroke-width', 20) // Thicker line for click area
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
      .on('click', (e) => {
        e.stopPropagation();
        if (onLinkClick) onLinkClick(e.target.__data__);
      });

    const link = svg
      .selectAll('.normal-link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'normal-link')
      .style('stroke', '#aaa')
      .attr('stroke-width', 2)
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    const node = svg
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('id', (d) => d.id)
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
      .call(
        d3
          .drag()
          .on('start', function (event, d) {
            dragstarted(d3.select(this), event, d);
          })
          .on('drag', function (event, d) {
            dragged(d3.select(this), event, d);
            updateNodes();
            updateLinks();
          })
          .on('end', function (event, d) {
            dragended(d3.select(this), event, d);
          }),
      );

    node
      .append('ellipse')
      .attr('rx', (n) => (n.invisible ? 0 : 50))
      .attr('ry', (n) => (n.invisible ? 0 : 30))
      .attr('stroke', 'black')
      .attr('fill', 'white');

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(function (d) {
        return d.name;
      });

    node.on('click', (e) => {
      if (onNodeClick) onNodeClick(e.currentTarget.getAttribute('id'));
    });

    function updateNodes() {
      node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    }

    function updateLinks() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      linkPadding
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
    }
  });

  return (
    <>
      <div
        ref={ref}
        style={{
          width,
          height,
        }}
      />
    </>
  );
}
