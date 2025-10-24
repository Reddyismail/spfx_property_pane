import * as React from "react";
// import styles from './Pane.module.scss';
import type { IPaneProps } from "./IPaneProps";
// import { escape } from '@microsoft/sp-lodash-subset';

export default class Pane extends React.Component<IPaneProps> {
  public render(): React.ReactElement<IPaneProps> {
    const {
      description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      // userDisplayName
      // discount,
      productName,
      productcost,
      quantity,
      billamount,
      netbillamount,
      discount,
      Card,
      productdescription,
      choiceselect,
      imageurl,
    } = this.props as any;
    // const {discount}=this.props

    return (
      <div>
        {description}
        <br />
        <h2>Congratulations</h2>
        <p>{Card}</p>
        <b>{discount}</b>
        <b>Details Find Below</b>
        <p>Product Name:{productName}</p>
        <p>Product productdescription:{productdescription}</p>
        <p>Product Cost:{productcost}</p>
        <p>Product Quantity:{quantity}</p>
        <p>Product billamount:{billamount}</p>
        <p>Product netbillamount:{netbillamount}</p>
        <br />
        <p>Selected Choice is:{choiceselect}</p>
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            height: "50%",
            backgroundSize: "cover",
          }}
        >
          <img src={imageurl} alt="" />
        </div>
      </div>

      // <section
      //   className={`${styles.pane} ${hasTeamsContext ? styles.teams : ""}`}
      // >
      //   <div className={styles.welcome}>
      //     <img
      //       alt=""
      //       src={
      //         isDarkTheme
      //           ? require("../assets/welcome-dark.png")
      //           : require("../assets/welcome-light.png")
      //       }
      //       className={styles.welcomeImage}
      //     />
      //     <h2>Well done, {escape(userDisplayName)}!</h2>
      //     <div>{environmentMessage}</div>
      //     <div>
      //       Web part property value: <strong>{escape(description)}</strong>
      //     </div>
      //   </div>
      //   <div>
      //     <h3>Welcome to SharePoint Framework!</h3>
      //     <p>
      //       The SharePoint Framework (SPFx) is a extensibility model for
      //       Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest
      //       way to extend Microsoft 365 with automatic Single Sign On, automatic
      //       hosting and industry standard tooling.
      //     </p>
      //     <h4>Learn more about SPFx development:</h4>
      //     <ul className={styles.links}>
      //       <li>
      //         <a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">
      //           SharePoint Framework Overview
      //         </a>
      //       </li>
      //       <li>
      //         <a
      //           href="https://aka.ms/spfx-yeoman-graph"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           Use Microsoft Graph in your solution
      //         </a>
      //       </li>
      //       <li>
      //         <a
      //           href="https://aka.ms/spfx-yeoman-teams"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           Build for Microsoft Teams using SharePoint Framework
      //         </a>
      //       </li>
      //       <li>
      //         <a
      //           href="https://aka.ms/spfx-yeoman-viva"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           Build for Microsoft Viva Connections using SharePoint Framework
      //         </a>
      //       </li>
      //       <li>
      //         <a
      //           href="https://aka.ms/spfx-yeoman-store"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           Publish SharePoint Framework applications to the marketplace
      //         </a>
      //       </li>
      //       <li>
      //         <a
      //           href="https://aka.ms/spfx-yeoman-api"
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           SharePoint Framework API reference
      //         </a>
      //       </li>
      //       <li>
      //         <a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">
      //           Microsoft 365 Developer Community
      //         </a>
      //       </li>
      //     </ul>
      //   </div>
      // </section>
    );
  }
}
