import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Grid, Card, Label, Icon, Divider,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Components.css';

class Timeline extends Component {

    render() {
        const {
            direction, icon, title, time, description, tags, labelColor, lineColor,
        } = this.props;
        const textAlign = direction === 'left' ? 'right' : 'left';

        const card = (
            <Card fluid raised style={{color: "#A2A3BB"}}>
                <Card.Content>
                    <Label pointing={textAlign} color={labelColor} attached="top" style={{marginLeft: '0', display: 'flex', justifyContent: direction === 'left' ? 'flex-end' : 'flex-start'}}>
                        {time}
                    </Label>
                    <Card.Header style={{display: 'flex', justifyContent: 'center'}}>
                        {title}
                    </Card.Header>
                    <Card.Description style={{display: 'flex', justifyContent: 'center'}}>
                        {description}
                    </Card.Description>
                    <Divider/>
                    <Label.Group color={"purple"}>
                        {tags.map((tag, i) => (
                            <Label key={i.toString()}>
                                {tag}
                            </Label>
                        ))}
                    </Label.Group>
                </Card.Content>
            </Card>
        );

        const left = direction === 'left' ? card : '';
        const right = direction === 'right' ? card : '';
        const iconSize = 'large';

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}/>
                        <Grid.Column width={5}>
                            {left}
                        </Grid.Column>
                        <Grid.Column width={2} style={{display:"block"}}>
                            <div style={{float: left ? "left" : "right"}}>
                            <Icon name={icon} size={iconSize} inverted circular
                                  style={{margin: 'auto', boxShadow: `0 0 0 0.1em ${lineColor} inset`}}/>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            {right}
                        </Grid.Column>
                        <Grid.Column width={2}/>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

Timeline.propTypes = {
    direction: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
};

export default Timeline;