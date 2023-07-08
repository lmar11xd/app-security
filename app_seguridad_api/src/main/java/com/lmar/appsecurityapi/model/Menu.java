package com.lmar.appsecurityapi.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SEGU_MENU")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@Column(name = "ID_APLICACION")
	private Integer appCode;
	
	@Column(name = "ID_PADRE")
	private Integer idParent;
	
	@Column(name = "DESCRIPCION", length = 64)
	private String title;
	
	@Column(name = "RUTA", length = 256)
	private String path;
	
	@Column(name = "ICONO", length = 64)
	private String icon;
		
	@Column(name = "USUARIO_CREACION", length = 64)
	private String createdBy;
	
	@Column(name = "FECHA_CREACION")
	private Date createdDate;
	
	@Column(name = "USUARIO_MODIFICACION", length = 64)
	private String modifiedBy;
	
	@Column(name = "FECHA_MODIFICACION")
	private Date modifiedDate;
}
