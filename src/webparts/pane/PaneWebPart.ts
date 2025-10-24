import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PaneWebPartStrings';
import Pane from './components/Pane';
import { IPaneProps } from './components/IPaneProps';

export interface IPaneWebPartProps {
  description: string;
  CardDetails: string;
  discount: string;
  productname: string;
  productdescription?: string;
  productcost?: string;
  quantity?: string;
  billamount?: string;
  choiceselect: string;
  imageurl?: string;
}

export default class PaneWebPart extends BaseClientSideWebPart<IPaneWebPartProps> {

  // private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IPaneProps> = React.createElement(
      Pane,
      {
        description: this.properties.description,
        Card: this.properties.CardDetails,
        discount: Number(this.properties.discount || 0),
        productName: this.properties.productname,
        productcost: Number(this.properties.productcost || 0),
        quantity: Number(this.properties.quantity || 0),
        billamount: Number(this.properties.billamount || 0),
        netbillamount: (Number(this.properties.billamount || 0) - Number(this.properties.discount || 0)),
        productdescription: String(this.properties.productdescription || ""),
        choiceselect: this.properties.choiceselect,
        imageurl: String(this.properties.imageurl || "")

      } as unknown as IPaneProps
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      //this._environmentMessage = message;
    });
  }


  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    //this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  // protected get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
  private validateNumber(value: string): string {
    if (value === null || value.trim().length === 0) {
      return "Value is required";
    } else if (value.length > 30) {
      return "Value exceeds maximum length of 30 characters";
    }
    return "";
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: "Product Details",
              groupFields: [
                PropertyPaneTextField('productname', {
                  label: "Product Name",
                  multiline: false,
                  // resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product name"
                }),
                PropertyPaneTextField('productdescription', {
                  label: "Product productdescription",
                  multiline: true,
                  resizable: false,
                  deferredValidationTime: 5000,
                  onGetErrorMessage: this.validateNumber.bind(this),
                  placeholder: "Please enter product productdescription"
                }),
                PropertyPaneTextField('productcost', {
                  label: "Product productcost ",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter product productcost"
                }),
                PropertyPaneTextField('quantity', {
                  label: "quantity ",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter quantity"
                }),
                PropertyPaneTextField('billamount', {
                  label: "billamount ",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter billamount"
                }),
                PropertyPaneTextField('discount', {
                  label: "Product discount ",
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000,
                  placeholder: "Please enter Product discount"
                }),

              ]
            },

            {
              groupName: 'Card Details',
              groupFields: [
                PropertyPaneDropdown("CardDetails", {
                  label: "Select Payment Method",
                  options: [
                    { key: "creditcard", text: "Credit Card" },
                    { key: "debitcard", text: "Debit Card" },
                    { key: "netbanking", text: "Net Banking" },
                    { key: "upi", text: "UPI" }
                  ],
                  selectedKey: "netbanking"
                }),
                PropertyPaneChoiceGroup("choiceselect", {
                  label: "Choice",
                  options: [
                    { key: "male", text: "Male" },
                    { key: "female", text: "FeMale" },
                    { key: "other", text: "Other" }
                  ]
                })
              ]
            },
            {
              groupName: "Image Details",
              groupFields: [
                PropertyPaneTextField('imageurl', {
                  label: 'image URL',
                  placeholder: 'Enter image URL here',
                  multiline: false,
                  resizable: false,
                  deferredValidationTime: 5000
                })
              ]
            }
          ]
        }
      ]
    };
  }

}
