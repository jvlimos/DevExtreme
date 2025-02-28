You can use Splitter widgets to create resizable panes on a page.

[note] To get started with DevExtreme Splitter, refer to the following tutorial for step-by-step instructions: [Getting Started with Splitter](/Documentation/Guide/UI_Components/Splitter/Getting_Started_with_Splitter/).

To specify splitter panes, set the [items](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/#items) or [dataSource](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/#dataSource) property. Use **dataSource** if data is remote or should be processed. If you specify multiple panes, they will appear one after another with splitters between them. 

The following base options are available for a pane:

- [resizable](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#resizable) (default: `true`)    
If true, a handle appears at the side of the pane. Drag the handle to adjust the pane size.

- [collapsible](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#collapsible) (default: `false`)    
If true, an arrow appears on the handle. Click the arrow to close the pane.

- [collapsed](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#collapsed) (default: `false`)    
Specifies whether the pane is initially collapsed.

To configure the layout of the Splitter component, you can specify its [orientation](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/#orientation) as *'vertical'* or *'horizontal'* (default). All Splitter "size" properties depend on the orientation. If it is *'horizontal'*, "size" is the width. Otherwise, it is height. The following "size" properties can be specified:

- [size](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#size)    
Initial pane width/height.

- [minSize](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#minSize)    
The minimum width/height for a resizable pane.

- [maxSize](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#maxSize)    
The maximum width/height for a resizable pane.

You can also place one Splitter inside another to create nested layouts. For this, use the [splitter](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#splitter) property.

Splitter panes can contain content of different types, from simple HTML markup to components. You can declare HTML markup inside the item tag or use the following properties to populate panes with content:

- [itemTemplate](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/#itemTemplate)    
Specifies a custom template for all panes.

- [template](/Documentation/ApiReference/UI_Components/dxSplitter/Configuration/items/#template)    
Specifies a custom template for an individual pane.