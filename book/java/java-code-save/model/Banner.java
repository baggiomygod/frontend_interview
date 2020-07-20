package com.fui.fuistore.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "banner") // 创建表的名称
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id自增
    private long id;
    @Column(length = 16) // 限制长度
    private String name; // 名称

    @Transient // Transient： 作用是让description字段 不会在创建的表里创建
    private String description; // 描述

    private String img; // 图片地址
    private String title;

    // 1. 单向关系
    @OneToMany
    @JoinColumn(name = "bannerId") // 指定外键
    private List<BannerItem> items; // Banner关联BannerItem

    // 2. 双向
    // Banner（一）---BannerItem（多） 一对多的关系
    //  // @OneToMany(fetch = FetchType.EAGER) // 急加载： EAGER,同时将bannerItem sql查询语句也执行
    // @OneToMany(mappedBy = "banner") // 懒加载 ，  双向里的一端 或叫 被维护端
    // private List<BannerItem> items; // Banner关联BannerItem

}

/*
    ORM作用是 通过实体与实体之间的关系配置。提高效率
 */