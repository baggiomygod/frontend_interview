package com.fui.fuistore.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "spu")
public class Spu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String subTitle;

    // TODO 加上就报错
//    @ManyToMany(mappedBy = "supList") // 被维护端
//    private List<Theme> themeList;
}
