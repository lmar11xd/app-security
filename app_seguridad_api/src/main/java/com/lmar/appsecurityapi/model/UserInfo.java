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
@Table(name = "SEGU_USUARIO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;
	
	@Column(name = "USERNAME", nullable = false, length = 64, unique = true)
	private String username;
	
	@Column(name = "PASSWORD", nullable = false, length = 256)
	private String password;
	
	@Column(name = "EMAIL", nullable = false, length = 64, unique = true)
	private String email;
	
	@Column(name = "USUARIO_CREACION", length = 64)
	private String createdBy;
	
	@Column(name = "FECHA_CREACION")
	private Date createdDate;
	
	@Column(name = "USUARIO_MODIFICACION", length = 64)
	private String modifiedBy;
	
	@Column(name = "FECHA_MODIFICACION")
	private Date modifiedDate;
}
