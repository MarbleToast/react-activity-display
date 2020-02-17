import React from "react";
import firebase from "firebase";
import Activity from "./Activity";

import "../css/common.css";
import "../css/ActivityDisplay.css"

interface ISortOrder {
    by: string,
    order: string
}

export interface IActivityAttributes {
    id: number,
    name: string,
    about: string,
    price: number,
    maxCapacity: number,
    category: Array<string>
    collection: Array<string>
}

interface IActivityDisplayProps {
    user: firebase.User | null | undefined
}

interface IActivityDisplayState {
    activities?: Array<IActivityAttributes>,
    mappedActivityObjects?: Array<JSX.Element>,
    isLoading: boolean,
    sortOrder?: ISortOrder
}


class ActivityDisplay extends React.Component<IActivityDisplayProps, IActivityDisplayState> {

    constructor(props: IActivityDisplayProps) {
        super(props);
        this.state = {
            isLoading: true
        };

        this.putActivityToTop = this.putActivityToTop.bind(this);
        this.putActivityToBottom = this.putActivityToBottom.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            fetch(
                "https://livitay.appspot.com/graphql",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        query: `
                            query {
                                getActivities(sequelizeQueryString:"{}") {
                                    id
                                    name
                                    about
                                    price
                                    maxCapacity
                                    category
                                    collection
                                }
                            }
                        `
                    })
                }
            )
            .then(
                response => response.json()
            )
            .then(
                data => this.setState({activities: data.data.getActivities})
            ).then (
                () => this.sortActivitiesByName()
            )
            .then(
                () => this.remapActivities()
            )
            .catch(
                error => console.log(error)
            );
        }
        
        this.setState({isLoading: false});
    }

    sortActivitiesByName(desc?: boolean) {

        if (this.state.activities) {
            const sorted = desc ? this.state.activities.sort((a,b) => -(a.name.localeCompare(b.name))) 
                                : this.state.activities.sort((a,b) => a.name.localeCompare(b.name));

            this.setState({activities: sorted});
            this.setState({
                sortOrder: {
                    by: "name", 
                    order: desc ? "desc" : "asc"
                }
            });
            
            this.remapActivities();
        }
    }

    sortActivitiesByPrice(desc?: boolean) {

        if (this.state.activities) {
            const sorted = desc ? this.state.activities.sort((a,b) => -(a.price - b.price))
                                : this.state.activities.sort((a,b) => a.price - b.price);
            
            this.setState({activities: sorted});
            this.setState({
                sortOrder: {
                    by: "price", 
                    order: desc ? "desc" : "asc"
                }
            });
            
            this.remapActivities();
        }
    }

    remapActivities() {
        if (this.state.activities)
            this.setState({
                mappedActivityObjects: this.state.activities.map(activity => <Activity key={activity.id} 
                                                                                    className="fade-in"
                                                                                    activity={activity}
                                                                                    sortToTop={this.putActivityToTop} 
                                                                                    sortToBottom={this.putActivityToBottom}/>)
            });
    }

    putActivityToTop(activity: IActivityAttributes) {
        if (this.state.activities){
            const index = this.state.activities.findIndex(a => a.id === activity.id);
            this.state.activities.splice(index, 1);
            this.state.activities.unshift(activity);
            this.remapActivities();
        }
    }

    putActivityToBottom(activity: IActivityAttributes) {
        if (this.state.activities){
            const index = this.state.activities.findIndex(a => a.id === activity.id);
            this.state.activities.splice(index, 1);
            this.state.activities.push(activity);
            this.remapActivities();
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="loading" />
            );
        }
        else {
            return (
                <div className="ActivityDisplay fade-in">
                    <div className="sort-options">
                        <button className="colour-pulse" onClick={
                            () => {
                                if (this.state.sortOrder?.by === "name" && this.state.sortOrder.order === "asc") {
                                    this.sortActivitiesByName(true);
                                }
                                else this.sortActivitiesByName();
                            }
                        }>Sort by Name</button>
                        <button className="colour-pulse" onClick={
                            () => {
                                if (this.state.sortOrder?.by === "price" && this.state.sortOrder.order === "asc") {
                                    this.sortActivitiesByPrice(true);
                                }
                                else this.sortActivitiesByPrice();
                            }
                        }>Sort by Price</button>
                    </div>
                    {this.state.mappedActivityObjects}
                </div>
            );
        }  
    }
};

export default ActivityDisplay;
