package com.fui.fuistore.model;

import javax.persistence.*;

@Entity
public class BannerItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id自增
    private Long id;
    private String img;
    private String keyword;
    private String type;
    private String name;
    // Unable to evaluate the expression Method threw 'org.hibernate.exception.SQLGrammarException' exception.
    //    private String size; // TODO:加了字段 查询时报错: Unknown column 'items0_.size' in 'field list'

    // 1. 单向关系
    // 外键, 建立bannerItem与banner表之间的关系
    private Long bannerId;

//    2. 双向关系
//    @ManyToOne // 多对一 与Banner model里 的OneToMany形成 双向关系
//    // 如果model中显示声明外键bannerId, 需要指明name=bannerId, 设置insertable, updateable为false
//    @JoinColumn(insertable = false, updatable = false, name = "bannerId") // BannerItem是多端（也叫关系维护端）
//    private Banner banner;
}
