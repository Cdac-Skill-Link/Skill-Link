package com.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.model.ServiceProvider;

@Repository
public interface ServiceProviderDao extends JpaRepository<ServiceProvider, Integer>{

	
	@Query("SELECT u FROM ServiceProvider u WHERE u.Username = ?1 AND u.Password = ?2")
    ServiceProvider validateServiceProvider(String username, String password);

	
	@Query(value="select rating from serviceproviders where serviceproviderid=:sid",nativeQuery=true)
	int getRating(int sid);
	
	
	
	@Modifying
	@Query(value="update serviceproviders set rating=:avg where serviceproviderid=:sid",nativeQuery=true)
	int updateRating(int sid, float avg);
	
	@Modifying
	@Query(value="update serviceproviders set password=:newpass where username=:sid",nativeQuery=true)

	int changepss(String sid, String newpass);

	
	
}