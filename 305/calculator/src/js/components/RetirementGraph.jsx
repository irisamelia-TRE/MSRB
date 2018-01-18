/* eslint max-len: 0 */  // --> OFF

import React, { Component } from 'react';
import {scaleLinear, scaleTime} from 'd3-scale';
import {axisBottom as d3AxisBottom, axisRight as d3AxisRight} from 'd3-axis';
import {path as d3Path} from 'd3-path';
import {select as d3Select} from 'd3-selection';
import {transform as d3Transform} from 'd3-transform';
import {timeYear as d3TimeYear} from 'd3-time';
import {format as d3Format} from 'd3-format';
import {numberToDollarString} from '../numberHelpers.js';
import styles from '../../style/retirement-graph.scss';

const width = 900;
const height = 500;

/*
   The display graph of retirement benefits
   props:
    - jobStartDate : 4 digit Number
    - retirementDate : 4 digit Number
    - birthDate : 4 digit Number
    - retirementFunction : retirementDate -> Number
      should return null if underspecified
 */
export default class RetirementGraph extends Component {
    /**
     * The range of dates displayed on the graph
     */
    dateScale(startDate, endDate) {
        return scaleTime()
            .domain([startDate, endDate])
            .range([50, width - 150]);
    }

    /**
     * Creates the y axis
     */
    yScale(endDate, retirementFunction) {
        const maxRetirementValue = retirementFunction(endDate);
        const digits = Math.floor(Math.log10(maxRetirementValue)) + 1;
        const cosineFactor = (2 * Math.PI * maxRetirementValue) / Math.pow(10, digits);
        const domainMax = maxRetirementValue / (0.5 - (0.2 * Math.cos(cosineFactor)));

        return scaleLinear()
            .domain([0, domainMax])
            .range([height - 25, 25]);
    }

    /**
     * Calculates the display of how much pension the user will recieve
     */
    pensionPath(dateScale, yScale, jobStartDate, retirementDate, retirementValue) {
        const path = d3Path();
        path.moveTo(dateScale(jobStartDate), yScale(0));
        path.lineTo(dateScale(retirementDate), yScale(retirementValue));
        path.lineTo(dateScale(retirementDate), yScale(0));
        path.closePath();

        return <path className={styles['pension-path']} vectorEffect='non-scaling-stroke' d={path.toString()}></path>;
    }

    projectionLine(dateScale, yScale, endDate, retirementDate, retirementFunction) {
        const retirementValue = retirementFunction(retirementDate);
        const projectedRetirementValue = retirementFunction(endDate);
        return (
            <line x1={dateScale(retirementDate)} y1={yScale(retirementValue)} x2={dateScale(endDate)} y2={yScale(projectedRetirementValue)} className={styles['projected-path']}></line>
        );
    }

    /**
     * Creates the x-axis
     * @param {String} ref - graph reference
     */
    xAxis(ref, startDate, endDate, dateScale) {
        const axis = d3AxisBottom(dateScale);
        const numYears = d3TimeYear.count(startDate, endDate);

        let yearStep = null;
        if (numYears <= 10) {
            yearStep = 1;
        } else if (numYears <= 20) {
            yearStep = 2;
        } else if (numYears <= 50){
            yearStep = 5;
        } else if (numYears <= 100) {
            yearStep = 10;
        } else if (numYears <= 200) {
            yearStep = 20;
        }

        if (yearStep !== null) {
            axis.ticks(d3TimeYear.every(yearStep));
        }

        const axisTransform = d3Transform().translate(() => [0, height - 25]);
        d3Select(ref)
            .attr('transform', axisTransform)
            .call(axis);
    }

    /**
     * Creates the y-axis
     * @param {String} ref - graph reference
     */
    yAxis(ref, yScale) {
        const axis = d3AxisRight(yScale);
        axis.tickFormat(d3Format('$,.0f'));

        const axisTransform = d3Transform().translate(() => [width - 150, 0]);
        d3Select(ref)
            .attr('transform', axisTransform)
            .call(axis);
    }

    /**
     * Creates the retirement label
     */
    retirementValueLabel(dateScale, yScale, retirementDate, retirementValue) {
        return (
            <text className={styles['pension-label']} textAnchor='end' x={dateScale(retirementDate)} y={yScale(retirementValue) - 5}>{numberToDollarString(retirementValue)}</text>
        );
    }

    projectEndDate(endDate) {
        return d3TimeYear.offset(endDate, 20);
    }

    /**
     * Renders the graph
     */
    render() {
        const {retirementDate, jobStartDate, retirementFunction, birthDate, ...props} = this.props;

        let startDate = null;
        let endDate = this.projectEndDate(d3TimeYear.floor(new Date()));

        let pensionPath = null;
        let xAxis = null;
        let yAxis = null;
        let retirementValueLabel = null;
        let dateScale = null;
        let yScale = null;
        let projectionLine = null;

        if (birthDate !== null) {
            startDate = birthDate;
        } else if (jobStartDate !== null) {
            startDate = jobStartDate;
        }

        if (startDate !== null) {
            dateScale = this.dateScale(startDate, endDate);
        }

        if (retirementDate !== null) {
            const retirementValue = retirementFunction(retirementDate);
            endDate = this.projectEndDate(retirementDate);
            dateScale = this.dateScale(startDate, endDate);
            yScale = this.yScale(endDate, retirementFunction);

            if (retirementValue !== null && startDate !== null) {
                pensionPath = this.pensionPath(dateScale, yScale, jobStartDate, retirementDate, retirementValue);
                retirementValueLabel = this.retirementValueLabel(dateScale, yScale, retirementDate, retirementValue);
                yAxis = <g ref={(ref) => this.yAxis(ref, yScale)}></g>;
                projectionLine = this.projectionLine(dateScale, yScale, endDate, retirementDate, retirementFunction);
            }
        }

        if (startDate !== null) {
            xAxis = <g ref={(ref) => this.xAxis(ref, startDate, endDate, dateScale)}></g>;
        }

        return (
            <svg {...props} className={styles['retirement-graph']} viewBox={'0 0 ' + width + ' ' + height} preserveAspectRatio='xMidYMid meet'>
                {pensionPath}
                {projectionLine}
                {xAxis}
                {yAxis}
                {retirementValueLabel}
            </svg>
        );

    }
}
