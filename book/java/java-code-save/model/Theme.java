package com.fui.fuistore.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "theme")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String name;
    private String extend;
    private String entranceImg;
    private String internalTopImg;
    private Boolean online;
    private String titleImg;
    private String tplName;

    // 导航属性
    @ManyToMany
    @JoinTable(
            name="theme_spu",
            joinColumns = @JoinColumn(name="theme_id"),
            inverseJoinColumns = @JoinColumn(name="spu_id")
            ) // 定义第三张表的规范
    private List<Spu> spuList;
}
