// Activity.tsx
// Component for rendering an activity in the Activity Display

// Imports
import React from "react";
import {IActivityAttributes} from "./ActivityDisplay";

// Props and State interface
interface IActivityProps {
    className?: string,
    activity: IActivityAttributes,
    sortToTop: Function,
    sortToBottom: Function
}
interface IActivityState {
    showMoreInfo: boolean;
}

// Activity class
class Activity extends React.Component<IActivityProps, IActivityState> {

    constructor(props: IActivityProps) {
        super(props);
        this.state = {
            showMoreInfo: false
        };
    }

    toggleShowMoreInfo() {
        // Sets the more info flag to its inverse
        this.setState({showMoreInfo: !this.state.showMoreInfo});
    }

    render () {
        return (
            <div className={"activity "+this.props.className}>
                <div className="activity-main">
                    <div className="activity-info">
                        <span className="activity-info-field">{this.props.activity.name}</span>
                        <span className="activity-info-field">£{this.props.activity.price}</span>
                    </div>
                    <div className="activity-options">
                        <button className="colour-pulse" onClick={() => this.toggleShowMoreInfo()}>More Info</button>
                        <button className="colour-pulse" onClick={() => this.props.sortToTop(this.props.activity)}>Move to Top</button>
                        <button className="colour-pulse" onClick={() => this.props.sortToBottom(this.props.activity)}>Move to Bottom</button>
                    </div>
                </div>
                <div className="activity-more-info" style={{display: this.state.showMoreInfo ? undefined : "none"}}>
                    <span><b>Description</b></span><br />
                    <span>{this.props.activity.about}</span><br />
                    <span><b>Maximum Capacity</b></span><br />
                    <span>{this.props.activity.maxCapacity}</span>
                </div>
            </div>
        );
    };
}

export default Activity;