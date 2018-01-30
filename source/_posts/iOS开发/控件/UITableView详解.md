---
title: UITableView详解
date: 2018-01-14 08:32:25
tags: UITableView
categories: iOS开发
thumbnail:
---



* UITableView**DataSource**
  * 必要的
    * 设置 tableview cell
    * 设置行数
  * 可选的
    * ​
* UITableView**Delegate**
  * 可选的
    * 设置行高





* UITableView**DataSource**

  * required
    * UITableViewCell 
    * numberOfRowsInSection
  * optional
    * numberOfSectionsInTableView 
    * titleForHeaderViewOrFooterView
    * index
      * sectionForSectionIndexTitle
      * sectionIndexTitlesForTableView

* UITableView**Delegate**

  * optional
    * Display customization
    * Variable (estimated) height support
    * Section header & footer information.返回一个 view
    * Accessories
    * should or did (Un)HighlightRowAtIndexPath
    * Called before the user changes the selection.
    * Editing

  ​